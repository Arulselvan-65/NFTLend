// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

contract LendingContract is ERC721Holder, ReentrancyGuard, Pausable {
    address public owner;

    uint96 public constant MAX_INTEREST = 1000; // 10% APR
    uint96 public constant BASE_LTV = 5000; // 50% base LTV
    uint96 public constant LATE_FEE = 500; // 5%

    uint32 public constant GRACE_PERIOD = 7 days;
    uint32 public constant BIDDING_DURATION = 1 days;

    uint96 public defaultNFTPrice = 1 ether;
    uint96 public totalLoans;

    struct Loan {
        address borrower;
        address lender;
        address nftContract;
        uint96 tokenId;     
        uint96 loanAmount;  
        uint32 interestRate; 
        uint32 dueDate;      
        uint96 remainingDebt;
        uint32 bidDeadline;
        bool active;
    }

    struct LoanOffer {
        address lender;
        uint32 interestRate;
        uint96 bidAmount;   
    }

    mapping(uint256 => Loan) private loans;       
    mapping(uint256 => LoanOffer[]) private loanOffers;
    mapping(address => uint96) private collectionLTVs;

    event LoanCreated(uint256 indexed loanId, address indexed borrower, address nftContract, uint96 loanAmount);
    event LoanOfferMade(uint256 indexed loanId, address indexed lender, uint32 interestRate, uint96 bidAmount);
    event LoanAccepted(uint256 indexed loanId, address indexed lender);
    event LoanRepaid(uint256 indexed loanId, address indexed borrower, uint96 amountPaid);
    event LoanFullyRepaid(uint256 indexed loanId, address indexed borrower);
    event CollectionLTVSet(address indexed collection, uint96 ltv);
    event BidsRefunded(uint256 indexed loanId);

    error ExceedsLTV();
    error BiddingEnded();
    error InvalidBidAmount();
    error InterestTooHigh();
    error LoanAlreadyActive();
    error NotBorrower();
    error InvalidOffer();
    error BiddingStillActive();
    error LoanNotActive();
    error InsufficientRepayment();
    error MaxLTVExceeded();

    constructor() {owner = msg.sender;}

    modifier onlyOwner(){ 
        require(msg.sender == owner, "Ownable: caller is not the owner");
        _;
    }

    function createLoan(
        address nftContract,
        uint96 tokenId,
        uint96 loanAmount
    ) external nonReentrant whenNotPaused returns (uint256) {
        if (loanAmount > getMaxLoanAmount(nftContract)) revert ExceedsLTV();

        uint256 loanId = totalLoans;
        unchecked {
            totalLoans = uint96(loanId + 1);
        }

        IERC721(nftContract).safeTransferFrom(msg.sender, address(this), tokenId);

        loans[loanId] = Loan({
            borrower: msg.sender,
            lender: address(0),
            nftContract: nftContract,
            tokenId: tokenId,
            loanAmount: loanAmount,
            interestRate: 0,
            dueDate: 0,
            remainingDebt: 0,
            bidDeadline: uint32(block.timestamp + BIDDING_DURATION),
            active: false
        });

        emit LoanCreated(loanId, msg.sender, nftContract, loanAmount);
        return loanId;
    }

    function offerLoan(uint256 loanId, uint32 interestRate) external payable nonReentrant whenNotPaused {
        Loan storage loan = loans[loanId];
        
        if (block.timestamp > loan.bidDeadline) revert BiddingEnded();
        if (msg.value == 0) revert InvalidBidAmount();
        if (interestRate > MAX_INTEREST) revert InterestTooHigh();
        if (loan.active) revert LoanAlreadyActive();

        loanOffers[loanId].push(LoanOffer({
            lender: msg.sender,
            interestRate: interestRate,
            bidAmount: uint96(msg.value) 
        }));

        emit LoanOfferMade(loanId, msg.sender, interestRate, uint96(msg.value));
    }

    function acceptLoan(uint256 loanId, uint256 offerIndex) external nonReentrant whenNotPaused {
        Loan storage loan = loans[loanId];
        
        if (msg.sender != loan.borrower) revert NotBorrower();
        if (block.timestamp > loan.bidDeadline) revert BiddingEnded();
        if (loan.active) revert LoanAlreadyActive();
        if (offerIndex >= loanOffers[loanId].length) revert InvalidOffer();

        LoanOffer memory chosenOffer = loanOffers[loanId][offerIndex];
        
        loan.lender = chosenOffer.lender;
        loan.interestRate = chosenOffer.interestRate;
        loan.dueDate = uint32(block.timestamp + 30 days);
        loan.remainingDebt = uint96(calculateTotalDue(loan.loanAmount, chosenOffer.interestRate));
        loan.active = true;

        payable(msg.sender).transfer(chosenOffer.bidAmount);

        _refundBids(loanId, offerIndex);

        emit LoanAccepted(loanId, chosenOffer.lender);
    }

    function refundBids(uint256 loanId) external nonReentrant whenNotPaused {
        Loan storage loan = loans[loanId];
        
        if (block.timestamp <= loan.bidDeadline) revert BiddingStillActive();
        if (loan.active) revert LoanAlreadyActive();

        _refundBids(loanId, type(uint256).max);
        
        emit BidsRefunded(loanId);
    }

    function repayLoan(uint256 loanId) external payable nonReentrant whenNotPaused {
        Loan storage loan = loans[loanId];
        
        if (!loan.active) revert LoanNotActive();
        if (msg.sender != loan.borrower) revert NotBorrower();
        if (msg.value == 0) revert InsufficientRepayment();

        uint96 payment = uint96(msg.value);
        unchecked {
            loan.remainingDebt -= payment;
        }

        payable(loan.lender).transfer(payment);

        if (loan.remainingDebt == 0) {
            loan.active = false;
            IERC721(loan.nftContract).safeTransferFrom(address(this), loan.borrower, loan.tokenId);
            emit LoanFullyRepaid(loanId, loan.borrower);
        } else {
            emit LoanRepaid(loanId, loan.borrower, payment);
        }
    }

    function calculateTotalDue(uint96 loanAmount, uint32 interestRate) public pure returns (uint256) {
        unchecked {
            return loanAmount + (uint256(loanAmount) * interestRate * 30 days) / (365 days * 10000);
        }
    }

    function getMaxLoanAmount(address nftContract) public view returns (uint96) {
    uint96 ltv = collectionLTVs[nftContract] > 0 ? collectionLTVs[nftContract] : BASE_LTV;
    uint256 maxLoan = (uint256(defaultNFTPrice) * ltv) / 10000;

    require(maxLoan <= type(uint96).max, "Value exceeds uint96 limit");
    return uint96(maxLoan);
}


    function setCollectionLTV(address collection, uint96 ltv) external onlyOwner {
        if (ltv > 7000) revert MaxLTVExceeded();
        collectionLTVs[collection] = ltv;
        emit CollectionLTVSet(collection, ltv);
    }

    function setDefaultNFTPrice(uint96 price) external onlyOwner {
        defaultNFTPrice = price;
    }

function setNFTApproval(address nftContract, uint96 tokenId) external {
    IERC721(nftContract).approve(address(this), tokenId);
}

    function _refundBids(uint256 loanId, uint256 excludeIndex) private {
        LoanOffer[] storage offers = loanOffers[loanId];
        for (uint256 i = 0; i < offers.length;) {
            if (i != excludeIndex) {
                payable(offers[i].lender).transfer(offers[i].bidAmount);
            }
            unchecked { ++i; }
        }
        delete loanOffers[loanId];
    }

    function getLoan(uint256 loanId) external view returns (Loan memory) {
        return loans[loanId];
    }

    function getLoanOffers(uint256 loanId) external view returns (LoanOffer[] memory) {
        return loanOffers[loanId];
    }

    function pause() external onlyOwner {
        _pause();
    }
    
    function unpause() external onlyOwner {
        _unpause();
    }
}
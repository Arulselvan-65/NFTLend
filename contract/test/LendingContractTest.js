const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("NFTLending", function () {
    let nftLending;
    let mockNFT;
    let owner;
    let borrower;
    let lender1;
    let lender2;
    let addrs;
    
    const TOKEN_ID = 1;
    const LOAN_AMOUNT = ethers.parseEther("0.5");
    const INTEREST_RATE = 500; // 5%
    
    beforeEach(async function () {
        [owner, borrower, lender1, lender2, ...addrs] = await ethers.getSigners();
        
        const MockNFT = await ethers.getContractFactory("MockNFT");
        mockNFT = await MockNFT.deploy();
        await mockNFT.waitForDeployment();
        
        const NFTLending = await ethers.getContractFactory("LendingContract");
        nftLending = await NFTLending.deploy();
        await nftLending.waitForDeployment();
        
        await mockNFT.connect(borrower).mint(TOKEN_ID);
        

        await mockNFT.connect(borrower).approve(await nftLending.getAddress(), TOKEN_ID);
    });
    
    describe("Contract Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await nftLending.owner()).to.equal(owner.address);
        });
        
        it("Should initialize with correct default values", async function () {
            expect(await nftLending.defaultNFTPrice()).to.equal(ethers.parseEther("1"));
            expect(await nftLending.totalLoans()).to.equal(0);
        });
    });
    
    describe("Loan Creation", function () {
        it("Should create a loan successfully", async function () {
            await expect(nftLending.connect(borrower).createLoan(
                await mockNFT.getAddress(),
                TOKEN_ID,
                LOAN_AMOUNT
            )).to.emit(nftLending, "LoanCreated")
              .withArgs(0, borrower.address, await mockNFT.getAddress(), LOAN_AMOUNT);
            
            const loan = await nftLending.getLoan(0);
            expect(loan.borrower).to.equal(borrower.address);
            expect(loan.active).to.equal(false);
        });
        
        it("Should fail if loan amount exceeds LTV", async function () {
            const excessiveAmount = ethers.parseEther("10");
            await expect(
                nftLending.connect(borrower).createLoan(
                    await mockNFT.getAddress(),
                    TOKEN_ID,
                    excessiveAmount
                )
            ).to.be.revertedWithCustomError(nftLending, "ExceedsLTV");
        });
    });
    
    describe("Loan Offers", function () {
        let loanId;
        
        beforeEach(async function () {
            const tx = await nftLending.connect(borrower).createLoan(
                await mockNFT.getAddress(),
                TOKEN_ID,
                LOAN_AMOUNT
            );
            await tx.wait();
            loanId = 0;
        });
        
        it("Should accept loan offers successfully", async function () {
            await expect(
                nftLending.connect(lender1).offerLoan(loanId, INTEREST_RATE, {
                    value: LOAN_AMOUNT
                })
            ).to.emit(nftLending, "LoanOfferMade")
             .withArgs(loanId, lender1.address, INTEREST_RATE, LOAN_AMOUNT);
            
            const offers = await nftLending.getLoanOffers(loanId);
            expect(offers.length).to.equal(1);
            expect(offers[0].lender).to.equal(lender1.address);
        });
        
        it("Should fail if interest rate is too high", async function () {
            const highInterest = 1100; // 11%
            await expect(
                nftLending.connect(lender1).offerLoan(loanId, highInterest, {
                    value: LOAN_AMOUNT
                })
            ).to.be.revertedWithCustomError(nftLending, "InterestTooHigh");
        });
        
        it("Should fail if bidding period has ended", async function () {
            await time.increase(2 * 24 * 60 * 60); // 2 days
            
            await expect(
                nftLending.connect(lender1).offerLoan(loanId, INTEREST_RATE, {
                    value: LOAN_AMOUNT
                })
            ).to.be.revertedWithCustomError(nftLending, "BiddingEnded");
        });
    });
    
    describe("Loan Acceptance", function () {
        let loanId;
        
        beforeEach(async function () {
            await nftLending.connect(borrower).createLoan(
                await mockNFT.getAddress(),
                TOKEN_ID,
                LOAN_AMOUNT
            );
            loanId = 0;
            
            await nftLending.connect(lender1).offerLoan(loanId, INTEREST_RATE, {
                value: LOAN_AMOUNT
            });
            await nftLending.connect(lender2).offerLoan(loanId, INTEREST_RATE - 100, {
                value: LOAN_AMOUNT
            });
        });
        
        it("Should accept loan offer successfully", async function () {
            const borrowerBalanceBefore = await ethers.provider.getBalance(borrower.address);
            
            await expect(
                nftLending.connect(borrower).acceptLoan(loanId, 1) // Accept lender2's offer
            ).to.emit(nftLending, "LoanAccepted")
             .withArgs(loanId, lender2.address);
            
            const loan = await nftLending.getLoan(loanId);
            expect(loan.active).to.equal(true);
            expect(loan.lender).to.equal(lender2.address);
            
            // Check borrower received the loan amount
            const borrowerBalanceAfter = await ethers.provider.getBalance(borrower.address);
            expect(borrowerBalanceAfter - borrowerBalanceBefore).to.be.closeTo(
                LOAN_AMOUNT,
                ethers.parseEther("0.01") // Account for gas costs
            );
        });
        
        it("Should fail if not borrower", async function () {
            await expect(
                nftLending.connect(lender1).acceptLoan(loanId, 0)
            ).to.be.revertedWithCustomError(nftLending, "NotBorrower");
        });
    });
    
    describe("Loan Repayment", function () {
        let loanId;
        
        beforeEach(async function () {
            await nftLending.connect(borrower).createLoan(
                await mockNFT.getAddress(),
                TOKEN_ID,
                LOAN_AMOUNT
            );
            loanId = 0;
            
            await nftLending.connect(lender1).offerLoan(loanId, INTEREST_RATE, {
                value: LOAN_AMOUNT
            });
            
            await nftLending.connect(borrower).acceptLoan(loanId, 0);
        });
        
        it("Should repay loan fully", async function () {
            const loan = await nftLending.getLoan(loanId);
            const totalDue = await nftLending.calculateTotalDue(LOAN_AMOUNT, INTEREST_RATE);
            
            await expect(
                nftLending.connect(borrower).repayLoan(loanId, {
                    value: totalDue
                })
            ).to.emit(nftLending, "LoanFullyRepaid")
             .withArgs(loanId, borrower.address);
            
            const loanAfter = await nftLending.getLoan(loanId);
            expect(loanAfter.active).to.equal(false);
            expect(loanAfter.remainingDebt).to.equal(0);
            
            // Check NFT returned to borrower
            expect(await mockNFT.ownerOf(TOKEN_ID)).to.equal(borrower.address);
        });
        
        it("Should allow partial repayment", async function () {
            const partialAmount = LOAN_AMOUNT / 2n;
            
            await expect(
                nftLending.connect(borrower).repayLoan(loanId, {
                    value: partialAmount
                })
            ).to.emit(nftLending, "LoanRepaid")
             .withArgs(loanId, borrower.address, partialAmount);
            
            const loanAfter = await nftLending.getLoan(loanId);
            expect(loanAfter.active).to.equal(true);
            expect(loanAfter.remainingDebt).to.be.gt(0);
        });
    });
    
    describe("Admin Functions", function () {
        it("Should set collection LTV", async function () {
            const newLTV = 6000; // 60%
            
            await expect(
                nftLending.connect(owner).setCollectionLTV(await mockNFT.getAddress(), newLTV)
            ).to.emit(nftLending, "CollectionLTVSet")
             .withArgs(await mockNFT.getAddress(), newLTV);
        });
        
        it("Should fail to set LTV if not owner", async function () {
            await expect(
                nftLending.connect(borrower).setCollectionLTV(await mockNFT.getAddress(), 6000)
            ).to.be.revertedWith("Ownable: caller is not the owner");
        });
        
        it("Should fail to set LTV above maximum", async function () {
            await expect(
                nftLending.connect(owner).setCollectionLTV(await mockNFT.getAddress(), 8000)
            ).to.be.revertedWithCustomError(nftLending, "MaxLTVExceeded");
        });
        
        it("Should set default NFT price", async function () {
            const newPrice = ethers.parseEther("2");
            await nftLending.connect(owner).setDefaultNFTPrice(newPrice);
            expect(await nftLending.defaultNFTPrice()).to.equal(newPrice);
        });
    });
    
    describe("Emergency Functions", function () {
        it("Should pause and unpause", async function () {
            await nftLending.connect(owner).pause();
            
            await expect(
                nftLending.connect(borrower).createLoan(
                    await mockNFT.getAddress(),
                    TOKEN_ID,
                    LOAN_AMOUNT
                )
            ).to.be.revertedWithCustomError(nftLending,"EnforcedPause");
            
            await nftLending.connect(owner).unpause();
            
            // Should work after unpause
            await expect(
                nftLending.connect(borrower).createLoan(
                    await mockNFT.getAddress(),
                    TOKEN_ID,
                    LOAN_AMOUNT
                )
            ).to.not.be.reverted;
        });
    });
});
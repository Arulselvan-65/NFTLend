export const wagmiConfig = {
    address: '0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e',
    abi: [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
          },
          {
            "inputs": [],
            "name": "BiddingEnded",
            "type": "error"
          },
          {
            "inputs": [],
            "name": "BiddingStillActive",
            "type": "error"
          },
          {
            "inputs": [],
            "name": "EnforcedPause",
            "type": "error"
          },
          {
            "inputs": [],
            "name": "ExceedsLTV",
            "type": "error"
          },
          {
            "inputs": [],
            "name": "ExpectedPause",
            "type": "error"
          },
          {
            "inputs": [],
            "name": "InsufficientRepayment",
            "type": "error"
          },
          {
            "inputs": [],
            "name": "InterestTooHigh",
            "type": "error"
          },
          {
            "inputs": [],
            "name": "InvalidBidAmount",
            "type": "error"
          },
          {
            "inputs": [],
            "name": "InvalidOffer",
            "type": "error"
          },
          {
            "inputs": [],
            "name": "LoanAlreadyActive",
            "type": "error"
          },
          {
            "inputs": [],
            "name": "LoanNotActive",
            "type": "error"
          },
          {
            "inputs": [],
            "name": "MaxLTVExceeded",
            "type": "error"
          },
          {
            "inputs": [],
            "name": "NotBorrower",
            "type": "error"
          },
          {
            "inputs": [],
            "name": "ReentrancyGuardReentrantCall",
            "type": "error"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "uint256",
                "name": "loanId",
                "type": "uint256"
              }
            ],
            "name": "BidsRefunded",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "collection",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "uint96",
                "name": "ltv",
                "type": "uint96"
              }
            ],
            "name": "CollectionLTVSet",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "uint256",
                "name": "loanId",
                "type": "uint256"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "lender",
                "type": "address"
              }
            ],
            "name": "LoanAccepted",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "uint256",
                "name": "loanId",
                "type": "uint256"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "borrower",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "address",
                "name": "nftContract",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "uint96",
                "name": "loanAmount",
                "type": "uint96"
              }
            ],
            "name": "LoanCreated",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "uint256",
                "name": "loanId",
                "type": "uint256"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "borrower",
                "type": "address"
              }
            ],
            "name": "LoanFullyRepaid",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "uint256",
                "name": "loanId",
                "type": "uint256"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "lender",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "uint32",
                "name": "interestRate",
                "type": "uint32"
              },
              {
                "indexed": false,
                "internalType": "uint96",
                "name": "bidAmount",
                "type": "uint96"
              }
            ],
            "name": "LoanOfferMade",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "uint256",
                "name": "loanId",
                "type": "uint256"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "borrower",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "uint96",
                "name": "amountPaid",
                "type": "uint96"
              }
            ],
            "name": "LoanRepaid",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "internalType": "address",
                "name": "account",
                "type": "address"
              }
            ],
            "name": "Paused",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "internalType": "address",
                "name": "account",
                "type": "address"
              }
            ],
            "name": "Unpaused",
            "type": "event"
          },
          {
            "inputs": [],
            "name": "BASE_LTV",
            "outputs": [
              {
                "internalType": "uint96",
                "name": "",
                "type": "uint96"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "BIDDING_DURATION",
            "outputs": [
              {
                "internalType": "uint32",
                "name": "",
                "type": "uint32"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "GRACE_PERIOD",
            "outputs": [
              {
                "internalType": "uint32",
                "name": "",
                "type": "uint32"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "LATE_FEE",
            "outputs": [
              {
                "internalType": "uint96",
                "name": "",
                "type": "uint96"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "MAX_INTEREST",
            "outputs": [
              {
                "internalType": "uint96",
                "name": "",
                "type": "uint96"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "loanId",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "offerIndex",
                "type": "uint256"
              }
            ],
            "name": "acceptLoan",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint96",
                "name": "loanAmount",
                "type": "uint96"
              },
              {
                "internalType": "uint32",
                "name": "interestRate",
                "type": "uint32"
              }
            ],
            "name": "calculateTotalDue",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "pure",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "nftContract",
                "type": "address"
              },
              {
                "internalType": "uint96",
                "name": "tokenId",
                "type": "uint96"
              },
              {
                "internalType": "uint96",
                "name": "loanAmount",
                "type": "uint96"
              }
            ],
            "name": "createLoan",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "defaultNFTPrice",
            "outputs": [
              {
                "internalType": "uint96",
                "name": "",
                "type": "uint96"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "loanId",
                "type": "uint256"
              }
            ],
            "name": "getLoan",
            "outputs": [
              {
                "components": [
                  {
                    "internalType": "address",
                    "name": "borrower",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "lender",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "nftContract",
                    "type": "address"
                  },
                  {
                    "internalType": "uint96",
                    "name": "tokenId",
                    "type": "uint96"
                  },
                  {
                    "internalType": "uint96",
                    "name": "loanAmount",
                    "type": "uint96"
                  },
                  {
                    "internalType": "uint32",
                    "name": "interestRate",
                    "type": "uint32"
                  },
                  {
                    "internalType": "uint32",
                    "name": "dueDate",
                    "type": "uint32"
                  },
                  {
                    "internalType": "uint96",
                    "name": "remainingDebt",
                    "type": "uint96"
                  },
                  {
                    "internalType": "uint32",
                    "name": "bidDeadline",
                    "type": "uint32"
                  },
                  {
                    "internalType": "bool",
                    "name": "active",
                    "type": "bool"
                  }
                ],
                "internalType": "struct LendingContract.Loan",
                "name": "",
                "type": "tuple"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "loanId",
                "type": "uint256"
              }
            ],
            "name": "getLoanOffers",
            "outputs": [
              {
                "components": [
                  {
                    "internalType": "address",
                    "name": "lender",
                    "type": "address"
                  },
                  {
                    "internalType": "uint32",
                    "name": "interestRate",
                    "type": "uint32"
                  },
                  {
                    "internalType": "uint96",
                    "name": "bidAmount",
                    "type": "uint96"
                  }
                ],
                "internalType": "struct LendingContract.LoanOffer[]",
                "name": "",
                "type": "tuple[]"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "nftContract",
                "type": "address"
              }
            ],
            "name": "getMaxLoanAmount",
            "outputs": [
              {
                "internalType": "uint96",
                "name": "",
                "type": "uint96"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "loanId",
                "type": "uint256"
              },
              {
                "internalType": "uint32",
                "name": "interestRate",
                "type": "uint32"
              }
            ],
            "name": "offerLoan",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              },
              {
                "internalType": "bytes",
                "name": "",
                "type": "bytes"
              }
            ],
            "name": "onERC721Received",
            "outputs": [
              {
                "internalType": "bytes4",
                "name": "",
                "type": "bytes4"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "owner",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "pause",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "paused",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "loanId",
                "type": "uint256"
              }
            ],
            "name": "refundBids",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "loanId",
                "type": "uint256"
              }
            ],
            "name": "repayLoan",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "collection",
                "type": "address"
              },
              {
                "internalType": "uint96",
                "name": "ltv",
                "type": "uint96"
              }
            ],
            "name": "setCollectionLTV",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint96",
                "name": "price",
                "type": "uint96"
              }
            ],
            "name": "setDefaultNFTPrice",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "nftContract",
                "type": "address"
              },
              {
                "internalType": "uint96",
                "name": "tokenId",
                "type": "uint96"
              }
            ],
            "name": "setNFTApproval",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "totalLoans",
            "outputs": [
              {
                "internalType": "uint96",
                "name": "",
                "type": "uint96"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "unpause",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          }
    ]
} as const;

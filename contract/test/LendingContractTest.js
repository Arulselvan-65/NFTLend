const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("NFTToken", function () {
    let nftToken;
    let owner;
    let borrower;
    let lender1;
    let lender2;
    let addrs;
    
    const TOKEN_ID = 0; // Changed to 0 since _nextTokenId starts at 0
    const TOKEN_URI = "ipfs://QmExample";
    
    beforeEach(async function () {
        [owner, borrower, lender1, lender2, ...addrs] = await ethers.getSigners();
        
        const NFTToken = await ethers.getContractFactory("NFTToken");
        nftToken = await NFTToken.deploy(owner.address);
        await nftToken.waitForDeployment();
    });
    
    describe("Contract Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await nftToken.owner()).to.equal(owner.address);
        });
        
        it("Should have correct name and symbol", async function () {
            expect(await nftToken.name()).to.equal("NFT Token");
            expect(await nftToken.symbol()).to.equal("NFTL");
        });
    });
    
    describe("Minting", function () {
        it("Should mint NFT successfully", async function () {
            await expect(nftToken.connect(owner).safeMint(borrower.address, TOKEN_URI))
                .to.emit(nftToken, "Transfer")
                .withArgs(ethers.ZeroAddress, borrower.address, TOKEN_ID);
            
            expect(await nftToken.ownerOf(TOKEN_ID)).to.equal(borrower.address);
            expect(await nftToken.tokenURI(TOKEN_ID)).to.equal(TOKEN_URI);
        });
        
        it("Should fail if non-owner tries to mint", async function () {
            await expect(
                nftToken.connect(borrower).safeMint(borrower.address, TOKEN_URI)
            ).to.be.revertedWithCustomError(
                nftToken,
                "OwnableUnauthorizedAccount"
            );
        });
        
        it("Should increment token ID correctly", async function () {
            await nftToken.connect(owner).safeMint(borrower.address, TOKEN_URI);
            await nftToken.connect(owner).safeMint(lender1.address, TOKEN_URI);
            
            expect(await nftToken.ownerOf(0)).to.equal(borrower.address);
            expect(await nftToken.ownerOf(1)).to.equal(lender1.address);
        });
    });
    
    describe("Token URI", function () {
        beforeEach(async function () {
            await nftToken.connect(owner).safeMint(borrower.address, TOKEN_URI);
        });
        
        it("Should return correct token URI", async function () {
            expect(await nftToken.tokenURI(TOKEN_ID)).to.equal(TOKEN_URI);
        });
        
        it("Should fail for non-existent token", async function () {
            await expect(nftToken.tokenURI(999))
                .to.be.revertedWithCustomError(nftToken, "ERC721NonexistentToken");
        });
    });
    
    describe("Interface Support", function () {
        it("Should support ERC721 interface", async function () {
            const ERC721_INTERFACE_ID = "0x80ac58cd";
            expect(await nftToken.supportsInterface(ERC721_INTERFACE_ID)).to.be.true;
        });
        
        it("Should support ERC721Metadata interface", async function () {
            const ERC721_METADATA_INTERFACE_ID = "0x5b5e139f";
            expect(await nftToken.supportsInterface(ERC721_METADATA_INTERFACE_ID)).to.be.true;
        });
    });
});
const {ethers} = require("hardhat")
const contractArtifact = require("../artifacts/contracts/LendingContract.sol/LendingContract.json")
const contractArtifact2 = require("../artifacts/contracts/NFTToken.sol/NFTToken.json")
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");


async function deployLendingContract(){
    const signer = await provider.getSigner();
    const contractFactory = new ethers.ContractFactory(contractArtifact.abi, contractArtifact.bytecode, signer);
    const contract = await contractFactory.deploy();

    console.log("Lending Contract deployed to address:", contract.target);
}


async function deployNFTContract() {
    const signer = await provider.getSigner();
    const contractFactory = new ethers.ContractFactory(contractArtifact2.abi, contractArtifact2.bytecode, signer);
    const nftContract = await contractFactory.deploy(signer.address);
    nftContractAddress = nftContract.target;

    console.log("NFT Contract deployed to address : ", nftContract.target);

    mintNFT(nftContract.target);
}

async function mintNFT(nftContractAddress) {
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(nftContractAddress, contractArtifact2.abi, signer);

    await contract.safeMint(signer.address, "https://bafybeigm4o2z67cphws4srdij4q3vsfl2hyt6kahtr7m3z2n2ingrhjbse.ipfs.dweb.link/");

    console.log("NFT minted!!!!")
}

deployLendingContract();
deployNFTContract();

import { useWriteContract, useAccount, useWaitForTransactionReceipt, useReadContract } from "wagmi";
import { hardhat } from "wagmi/chains";
import { wagmiConfig } from "./contract";

interface CreateLoanParams {
    nftContractAddress: `0x${string}`,
    tokenId: string,
    loanAmount: bigint
}

export const useCreateAccount = () => {
    const { address } = useAccount();

    const { data: hash, isPending, isError, writeContract } = useWriteContract();

    const { isSuccess } = useWaitForTransactionReceipt({
        hash
    });

    const { data: maxLoanAmount, isLoading } = useReadContract({
        ...wagmiConfig,
        functionName: "getMaxLoanAmount",
        args: ['0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0'],
        chainId: hardhat.id
      });

    console.log("Max Loan Amount:", maxLoanAmount);

    async function createLoan({ nftContractAddress, tokenId, loanAmount }: CreateLoanParams) {
        if (!address) throw new Error("Wallet not connected");

        try {
            // Validate NFT contract address
            if (!nftContractAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
                throw new Error("Invalid NFT contract address format");
            }

            // Validate tokenId
            const formattedTokenId = BigInt(tokenId);
            if (formattedTokenId < 0) {
                throw new Error("Invalid tokenId: must be a positive integer");
            }


            // Approve NFT transfer if not already approved
            await writeContract({
                ...wagmiConfig,
                functionName: "setNFTApproval",
                args: ["0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0", BigInt(0)],
                account: address
            });

            // Execute the loan creation
            const tx = await writeContract({
                ...wagmiConfig,
                functionName: "createLoan",
                args: [nftContractAddress, formattedTokenId, loanAmount],
                chain: hardhat,
                account: address
            });

            return tx;
        } catch (e: any) {
            console.error("Error creating loan:", e);

            if (e.message.includes("user rejected")) {
                throw new Error("Transaction rejected by user");
            } else if (e.message.includes("insufficient funds")) {
                throw new Error("Insufficient funds for transaction");
            } else if (e.code === -32603) {
                throw new Error("Contract interaction failed. Please check your inputs and try again");
            }

            throw e;
        }
    }


    return {
        createLoan,
        isPending,
        isError,
        isSuccess,
        hash
    };
};
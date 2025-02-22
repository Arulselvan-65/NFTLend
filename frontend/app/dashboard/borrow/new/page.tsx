"use client"

import React, { useState } from 'react';
import { ArrowLeft, Info } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { useCreateAccount } from '@/utils/createLoan';
import { parseEther } from 'viem';

const CreateLoanPage = () => {
  const { createLoan, isPending, isSuccess, isError } = useCreateAccount();

  const [formData, setFormData] = useState({
    nftContractAddress: '',
    tokenId: '',
    loanAmount: '',
  });

  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    
    try {
      // Basic input validation
      if (!formData.nftContractAddress.startsWith('0x')) {
        setErrorMessage("NFT contract address must start with 0x");
        return;
      }

      if (!formData.tokenId.match(/^\d+$/)) {
        setErrorMessage("Token ID must be a valid number");
        return;
      }

      if (isNaN(Number(formData.loanAmount)) || Number(formData.loanAmount) <= 0) {
        setErrorMessage("Loan amount must be a valid positive number");
        return;
      }

      // Convert values to appropriate types
      const params = {
        nftContractAddress: formData.nftContractAddress as `0x${string}`,
        tokenId: formData.tokenId,
        loanAmount: parseEther(formData.loanAmount) // Convert ETH to Wei
      };

      await createLoan(params);
    } catch (error: any) {
      console.error('Error creating loan:', error);
      setErrorMessage(error.message || "Failed to create loan. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-gray-900 relative overflow-hidden">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-gradient-radial from-violet-600/20 via-transparent to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-gradient-radial from-blue-600/20 via-transparent to-transparent rounded-full blur-3xl animate-pulse-slow delay-500"></div>
      </div>

      <div className="relative z-10">
        <div className="relative mb-4">
          <div className="absolute -left-8 -right-8 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

          <div className="flex items-center justify-center h-16 relative">
            <Link href='/dashboard/borrow' className="absolute left-0 flex items-center gap-2">
              <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-400" />
              </button>
              <span className="hidden md:inline text-gray-400">Back</span>
            </Link>
            <span className="flex justify-center items-center h-10 w-40 text-sm font-medium text-violet-400 bg-violet-500/10 rounded-full border border-violet-500/20">
              New Loan Request
            </span>
          </div>
        </div>

        <Card className="my-10 bg-gray-800/30 backdrop-blur-xl border border-gray-700/30 transition-all duration-300 max-w-2xl mx-auto shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl">Create New Loan</CardTitle>
            <CardDescription>Enter the details for your NFT-backed loan request</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    NFT Contract Address
                  </label>
                  <input
                    type="text"
                    name="nftContractAddress"
                    value={formData.nftContractAddress}
                    onChange={handleChange}
                    className="w-full px-4 py-3 outline-none rounded-xl bg-gray-800/40 border border-gray-700/30 focus:border-violet-500/50 focus:ring-violet-500/20 transition-all duration-300 text-white placeholder-gray-500"
                    placeholder="0x..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Token ID
                  </label>
                  <input
                    type="text"
                    name="tokenId"
                    value={formData.tokenId}
                    onChange={handleChange}
                    className="w-full px-4 py-3 outline-none rounded-xl bg-gray-800/40 border border-gray-700/30 focus:border-violet-500/50 focus:ring-violet-500/20 transition-all duration-300 text-white placeholder-gray-500"
                    placeholder="Enter NFT token ID"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Loan Amount (ETH)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="loanAmount"
                      value={formData.loanAmount}
                      onChange={handleChange}
                      className="w-full px-4 py-3 outline-none rounded-xl bg-gray-800/40 border border-gray-700/30 focus:border-violet-500/50 focus:ring-violet-500/20 transition-all duration-300 text-white placeholder-gray-500"
                      placeholder="0.00"
                      step="0.01"
                      required
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-gray-400">
                      <Info className="w-4 h-4" />
                      <span className="text-sm">Max LTV applies</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full px-4 py-3 rounded-xl bg-violet-500/20 backdrop-blur-sm border border-violet-500/30 
                  text-violet-300 font-medium transition-all duration-300 
                  hover:bg-violet-500/30 hover:border-violet-400/50 hover:text-violet-200 
                  focus:ring-2 focus:ring-violet-500/20 focus:ring-offset-2 focus:ring-offset-gray-900
                  disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? 'Creating Loan...' : 'Create Loan Request'}
                </button>
              </div>

              {isSuccess && (
                <div className="mt-4 p-4 rounded-lg bg-green-500/20 border border-green-500/30 text-green-300">
                  Loan request created successfully!
                </div>
              )}

              {(isError || errorMessage) && (
                <div className="mt-4 p-4 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300">
                  {errorMessage || "Error creating loan request. Please try again."}
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateLoanPage;
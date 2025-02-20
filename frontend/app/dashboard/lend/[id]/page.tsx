"use client"

import { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Wallet, User, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function BidPlacementPage() {
    const [bidAmount, setBidAmount] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [loading, setLoading] = useState(false);

    const requestDetails = {
        id: "1",
        nftName: "Bored Ape #1234",
        collateral: "BAYC",
        requestedAmount: "45.5",
        minInterest: "4.5",
        timeLeft: "2 days",
        borrower: "0x1234...5678",
        floorPrice: "80 ETH",
        status: "active",
        image: "https://bafybeifpccidwt2cvcm6etjaivuhbwkk66ws2zhm4tj4a73vm5wm2bmu2i.ipfs.dweb.link/"
    };

    useEffect(() => {
        if (bidAmount && parseFloat(bidAmount) > parseFloat(requestDetails.requestedAmount)) {
            toast.error('Bid amount exceeds the requested amount');
        }
    }, [bidAmount]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (parseFloat(bidAmount) <= 0) {
            toast.error('Please enter a valid bid amount');
            return;
        }
        if (parseFloat(interestRate) < parseFloat(requestDetails.minInterest)) {
            toast.error(`Interest rate must be at least ${requestDetails.minInterest}%`);
            return;
        }

        setLoading(true);
        const loadingToast = toast.loading('Placing your bid...');

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            toast.success('Bid placed successfully!', { id: loadingToast });
            setBidAmount('');
            setInterestRate('');
        } catch (error) {
            toast.error('Failed to place bid. Please try again.', { id: loadingToast });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-center h-16 relative">
            <Link href='/dashboard/borrow' className="absolute left-0 flex items-center gap-2">
              <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-400" />
              </button>
              <span className="hidden md:inline text-gray-400">Back</span>
            </Link> 
          </div>

            {/* Main Content */}
                <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Side - NFT Image */}
                    <div className="bg-gray-800/50 rounded-xl overflow-hidden flex flex-col">
                        <div className="relative aspect-square">
                            <img 
                                src={requestDetails.image} 
                                alt={requestDetails.nftName} 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-4">
                            <h1 className="text-xl font-semibold text-white">{requestDetails.nftName}</h1>
                            <p className="text-sm text-gray-400 mt-1">{requestDetails.collateral}</p>
                        </div>
                    </div>

                    {/* Right Side - Details and Form */}
                    <div className="flex flex-col gap-6">
                        {/* NFT Details */}
                        <div className="bg-gray-800/50 rounded-xl p-6 flex-1">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-white">Loan Details</h2>
                                <div className="bg-violet-500/10 px-3 py-1 rounded-lg">
                                    <p className="text-violet-400 capitalize text-sm">{requestDetails.status}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-900/50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-400 flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4" />
                                        Floor Price
                                    </p>
                                    <p className="text-white mt-2 font-medium">{requestDetails.floorPrice}</p>
                                </div>
                                <div className="bg-gray-900/50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-400 flex items-center gap-2">
                                        <Wallet className="w-4 h-4" />
                                        Requested
                                    </p>
                                    <p className="text-white mt-2 font-medium">{requestDetails.requestedAmount} ETH</p>
                                </div>
                                <div className="bg-gray-900/50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-400 flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        Time Left
                                    </p>
                                    <p className="text-white mt-2 font-medium">{requestDetails.timeLeft}</p>
                                </div>
                                <div className="bg-gray-900/50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-400 flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        Borrower
                                    </p>
                                    <p className="text-white mt-2 font-mono text-sm">{requestDetails.borrower}</p>
                                </div>
                            </div>
                        </div>

                        {/* Bid Form */}
                        <div className="bg-gray-800/50 rounded-xl p-6">
                            <h2 className="text-lg font-semibold text-white mb-4">Place Your Bid</h2>
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">
                                        Bid Amount (ETH)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={bidAmount}
                                            onChange={(e) => setBidAmount(e.target.value)}
                                            placeholder="0.00"
                                            required
                                            className="w-full h-12 px-4 bg-gray-900/75 rounded-lg 
                                                    focus:outline-none focus:ring-2 focus:ring-violet-500
                                                    text-white placeholder-gray-500"
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">ETH</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">
                                        Interest Rate (%)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={interestRate}
                                            onChange={(e) => setInterestRate(e.target.value)}
                                            placeholder="0.00"
                                            required
                                            className="w-full h-12 px-4 bg-gray-900/75 rounded-lg 
                                                    focus:outline-none focus:ring-2 focus:ring-violet-500
                                                    text-white placeholder-gray-500"
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">%</span>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-2">
                                        Minimum rate: {requestDetails.minInterest}%
                                    </p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-12 rounded-lg bg-violet-600 text-white
                                            hover:bg-violet-700 transition-colors disabled:opacity-50
                                            font-medium"
                                >
                                    {loading ? 'Placing Bid...' : 'Place Bid'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
        </div>
    );
}
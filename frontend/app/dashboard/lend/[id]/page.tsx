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
        status: "active"
    };

    useEffect(() => {
        if (bidAmount && parseFloat(bidAmount) > parseFloat(requestDetails.requestedAmount)) {
            toast.error('Bid amount exceeds the requested amount');
        }
    }, [bidAmount]);

    const handleSubmit = async (e: any) => {
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
        <div className="min-h-screen">
            <div className="max-w-6xl mx-auto px-4 py-6">
                <div className="mb-6">
                    <Link href="/dashboard/borrow" className="inline-flex items-center gap-2 hover:opacity-80">
                        <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                            <ArrowLeft className="w-5 h-5 text-gray-400" />
                        </button>
                        <span className="hidden md:inline text-gray-400">Back</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-violet-500/10 rounded-xl flex items-center justify-center text-violet-500 font-medium">
                                NFT
                            </div>
                            <h2 className="text-xl font-bold text-white">{requestDetails.nftName}</h2>
                        </div>

                        <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                            <div>
                                <p className="text-sm text-gray-400 flex items-center gap-2 mb-2">
                                    <TrendingUp className="w-4 h-4" />
                                    Floor Price
                                </p>
                                <p className="text-lg font-medium text-white">{requestDetails.floorPrice}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400 flex items-center gap-2 mb-2">
                                    <Wallet className="w-4 h-4" />
                                    Requested Amount
                                </p>
                                <p className="text-lg font-medium text-white">{requestDetails.requestedAmount} ETH</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400 flex items-center gap-2 mb-2">
                                    <Clock className="w-4 h-4" />
                                    Time Left
                                </p>
                                <p className="text-lg font-medium text-white">{requestDetails.timeLeft}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400 flex items-center gap-2 mb-2">
                                    <TrendingUp className="w-4 h-4" />
                                    Min Interest Rate
                                </p>
                                <p className="text-lg font-medium text-white">{requestDetails.minInterest}%</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-sm text-gray-400 flex items-center gap-2 mb-2">
                                    <User className="w-4 h-4" />
                                    Borrower
                                </p>
                                <p className="text-lg font-mono text-white bg-gray-900/50 px-3 py-1.5 rounded-lg">{requestDetails.borrower}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                        <h2 className="text-xl font-bold text-white mb-6">Place Your Bid</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">
                                    Bid Amount
                                </label>
                                <div className="relative">
                                    <input
                                        type="string"
                                        value={bidAmount}
                                        onChange={(e) => setBidAmount(e.target.value)}
                                        placeholder="0.00"
                                        required
                                        className="w-full h-12 px-4 bg-gray-900/75 border border-gray-700 rounded-lg 
                                                 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 
                                                 text-white placeholder-gray-500 text-lg"
                                    />
                                    <span className="absolute right-4 top-3.5 text-gray-500">ETH</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">
                                    Interest Rate
                                </label>
                                <div className="relative">
                                    <input
                                        type="string"
                                        value={interestRate}
                                        onChange={(e) => setInterestRate(e.target.value)}
                                        placeholder="0.00"
                                        required
                                        className="w-full h-12 px-4 bg-gray-900/75 border border-gray-700 rounded-lg 
                                                 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 
                                                 text-white placeholder-gray-500 text-lg"
                                    />
                                    <span className="absolute right-4 top-3.5 text-gray-500">%</span>
                                </div>
                                <p className="text-sm text-gray-400 mt-2">
                                    Minimum rate: {requestDetails.minInterest}%
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full h-14 rounded-xl bg-violet-500/10 text-violet-400 font-medium text-center flex items-center justify-center hover:bg-violet-500/20 transition-all duration-300"
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
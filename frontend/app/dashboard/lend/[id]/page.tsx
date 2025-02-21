"use client"

import { useState } from 'react';
import { ArrowLeft, Clock, Wallet, User, TrendingUp } from 'lucide-react';
import Link from 'next/link';

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
        image: "/api/placeholder/400/400"
    };

    return (
        <div className="h-screen bg-gray-900 flex flex-col overflow-hidden !pt-0">
            <div className="relative mb-2">
                <div className="absolute -left-8 -right-8 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

                <div className="flex items-center justify-center h-16 relative">
                    <Link href='/dashboard/borrow' className="absolute left-0 flex items-center gap-2">
                        <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                            <ArrowLeft className="w-5 h-5 text-gray-400" />
                        </button>
                        <span className="hidden md:inline text-gray-400">Back</span>
                    </Link>
                </div>
            </div>

            <div className="flex-1">
                <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-800/50 rounded-xl p-4 flex flex-col">
                        <div className="relative w-full pt-[100%]">
                            <img
                                src={requestDetails.image}
                                alt={requestDetails.nftName}
                                className="absolute inset-0 w-full h-full object-cover rounded-lg"
                            />
                        </div>
                        <div className="mt-4">
                            <h1 className="text-xl font-bold text-white">{requestDetails.nftName}</h1>
                        </div>
                    </div>

                    {/* Right side - Details and Form */}
                    <div className="bg-gray-800/50 rounded-xl p-6 flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-gray-300">{requestDetails.collateral}</h2>
                            <div className="bg-violet-500/10 px-3 py-1 rounded-lg">
                                <p className="text-violet-400 text-sm">{requestDetails.status}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-gray-900/50 p-4 rounded-lg">
                                <p className="text-sm text-gray-400 flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4" />
                                    Floor Price
                                </p>
                                <p className="text-white mt-1">{requestDetails.floorPrice}</p>
                            </div>
                            <div className="bg-gray-900/50 p-4 rounded-lg">
                                <p className="text-sm text-gray-400 flex items-center gap-2">
                                    <Wallet className="w-4 h-4" />
                                    Requested
                                </p>
                                <p className="text-white mt-1">{requestDetails.requestedAmount} ETH</p>
                            </div>
                            <div className="bg-gray-900/50 p-4 rounded-lg">
                                <p className="text-sm text-gray-400 flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    Time Left
                                </p>
                                <p className="text-white mt-1">{requestDetails.timeLeft}</p>
                            </div>
                            <div className="bg-gray-900/50 p-4 rounded-lg">
                                <p className="text-sm text-gray-400 flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    Borrower
                                </p>
                                <p className="text-white mt-1 font-mono">{requestDetails.borrower}</p>
                            </div>
                        </div>

                        <div className="mt-auto">
                            <h2 className="text-lg font-bold text-white mb-4">Place Your Bid</h2>
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">
                                        Bid Amount
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={bidAmount}
                                            onChange={(e) => setBidAmount(e.target.value)}
                                            placeholder="0.00"
                                            className="w-full h-12 px-4 bg-gray-900/75 rounded-lg 
                                                     focus:outline-none focus:ring-1 focus:ring-violet-500
                                                     text-white placeholder-gray-500"
                                        />
                                        <span className="absolute right-4 top-3 text-gray-400">ETH</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">
                                        Interest Rate
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={interestRate}
                                            onChange={(e) => setInterestRate(e.target.value)}
                                            placeholder="0.00"
                                            className="w-full h-12 px-4 bg-gray-900/75 rounded-lg 
                                                     focus:outline-none focus:ring-1 focus:ring-violet-500
                                                     text-white placeholder-gray-500"
                                        />
                                        <span className="absolute right-4 top-3 text-gray-400">%</span>
                                    </div>
                                    <p className="text-sm text-gray-400 mt-2">
                                        Minimum rate: {requestDetails.minInterest}%
                                    </p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-12 rounded-lg bg-violet-600 text-white
                                             hover:bg-violet-700 transition-colors disabled:opacity-50"
                                >
                                    {loading ? 'Placing Bid...' : 'Place Bid'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
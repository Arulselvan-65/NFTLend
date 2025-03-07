"use client"

import { useState } from 'react';
import { ArrowLeft, Wallet, Clock, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { BidsCard } from "@/components/borrow/BidsCard";
import Link from 'next/link';

interface Bid {
    id: string;
    lender: string;
    amount: string;
    interestRate: string;
    timestamp: Date;
    deadline: Date;
    nftName: string;
    collateral: string;
}


export default function BidsReviewPage() {
    const [loan, setLoan] = useState({
        id: "1",
        nftName: "Bored Ape #1234",
        collateral: "BAYC",
        requestedAmount: "45.5 ETH",
        status: "bidding",
    });

    const [bids, setBids] = useState<Bid[]>([
        {
            id: "1",
            lender: "0x1234...5678",
            amount: "43.2 ETH",
            interestRate: "5.2%",
            timestamp: new Date(Date.now() - 3600000),
            deadline: new Date(Date.now() + 86400000), // 24 hours from now
            nftName: loan.nftName,
            collateral: loan.collateral
        },
        {
            id: "2",
            lender: "0x8765...4321",
            amount: "42.8 ETH",
            interestRate: "4.8%",
            timestamp: new Date(Date.now() - 7200000),
            deadline: new Date(Date.now() + 86400000),
            nftName: loan.nftName,
            collateral: loan.collateral
        },
        {
            id: "3",
            lender: "0x9876...2468",
            amount: "44.0 ETH",
            interestRate: "5.5%",
            timestamp: new Date(Date.now() - 1800000),
            deadline: new Date(Date.now() + 86400000),
            nftName: loan.nftName,
            collateral: loan.collateral
        }
    ]);

    const handleAcceptBid = (bid: Bid) => {
        console.log('Accepting bid:', bid);
    };

    return (
        <div className="container mx-auto">
            <div className="relative mb-8">
                <div className="absolute -left-4 sm:-left-8 -right-4 sm:-right-8 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 py-4 sm:h-16">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard/borrow">
                            <button className="p-2 rounded-xl bg-gray-800/40 hover:bg-gray-800/60 transition-colors">
                                <ArrowLeft className="w-5 h-5 text-gray-400" />
                            </button>
                        </Link>

                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center">
                                <span className="text-white font-bold">
                                    {loan?.collateral?.[0] || 'N/A'}
                                </span>
                            </div>

                            <div>
                                <h1 className="text-lg sm:text-xl font-bold text-white">
                                    {loan?.nftName || 'NFT Name'}
                                </h1>
                                <p className="text-xs sm:text-sm text-gray-400">
                                    Review loan offers
                                </p>
                            </div>
                        </div>
                    </div>

                    <span className="hidden md:block px-3 py-1.5 rounded-full text-sm font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20">
                        Bidding ends in 24h
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <Card className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/30">
                    <CardContent className="!p-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/20">
                                <Wallet className="w-6 h-6 text-violet-500" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Requested Amount</p>
                                <p className="text-xl font-bold text-white">{loan.requestedAmount}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/30">
                    <CardContent className="!p-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20">
                                <Clock className="w-6 h-6 text-fuchsia-500" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Total Offers</p>
                                <p className="text-xl font-bold text-white">{bids.length}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/30 sm:col-span-2 lg:col-span-1">
                    <CardContent className="!p-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                <TrendingUp className="w-6 h-6 text-blue-500" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Best Rate</p>
                                <p className="text-xl font-bold text-white">
                                    {Math.min(...bids.map(bid => parseFloat(bid.interestRate)))}%
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <BidsCard
                bids={bids}
                onAcceptBid={handleAcceptBid}
            />
        </div>
    );
};


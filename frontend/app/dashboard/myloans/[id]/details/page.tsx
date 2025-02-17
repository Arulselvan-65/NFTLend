"use client"

import { useState } from 'react';
import { Wallet, Clock, ArrowLeft, History, Tag, Percent, Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function LoanDetailsPage() {
  const [loanDetails] = useState({
    id: 1,
    nftName: "Bored Ape #1234",
    amount: "45.5 ETH",
    interest: "5.2%",
    duration: "30 days",
    remaining: "22 days",
    status: "active",
    collateral: "BAYC",
    startDate: "Jan 24, 2024",
    endDate: "Feb 23, 2024",
    collateralValue: "85.2 ETH",
    healthFactor: "1.87",
    paymentHistory: [
      { date: "Feb 1, 2024", amount: "0.197 ETH", type: "Interest Payment" },
      { date: "Jan 28, 2024", amount: "0.197 ETH", type: "Interest Payment" },
      { date: "Jan 24, 2024", amount: "45.5 ETH", type: "Loan Originated" },
    ],
    lenderAddress: "0x1234567890abcdef"
  });

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-gradient-radial from-violet-600/20 via-transparent to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-gradient-radial from-blue-600/20 via-transparent to-transparent rounded-full blur-3xl animate-pulse-slow delay-500"></div>
      </div>

      <div className="relative z-10">
        <div className="relative mb-8">
          <div className="absolute -left-8 -right-8 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href='/dashboard/myloans'>
                <button className="p-2 rounded-xl bg-gray-800/40 hover:bg-gray-800/60 transition-colors">
                  <ArrowLeft className="w-5 h-5 text-gray-400" />
                </button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center">
                  <span className="text-white font-bold">{loanDetails.collateral[0]}</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">{loanDetails.nftName}</h1>
                  <p className="text-sm text-gray-400">Loan #{loanDetails.id}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-3 py-1.5 rounded-full text-sm font-medium 
                ${loanDetails.status === 'active'
                  ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                  : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                }`}>
                {loanDetails.status.charAt(0).toUpperCase() + loanDetails.status.slice(1)}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/30 hover:border-violet-500/30 transition-all duration-300 order-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>Loan Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Tag className="w-4 h-4" />
                    <span className="text-sm">Lender Address</span>
                  </div>
                  <p className="text-lg font-medium text-white break-words">{loanDetails.lenderAddress}</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Wallet className="w-4 h-4" />
                      <span className="text-sm">Borrowed</span>
                    </div>
                    <p className="text-lg font-medium text-white">{loanDetails.amount}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Percent className="w-4 h-4" />
                      <span className="text-sm">Interest Rate</span>
                    </div>
                    <p className="text-lg font-medium text-white">{loanDetails.interest}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Duration</span>
                    </div>
                    <p className="text-lg font-medium text-white">{loanDetails.duration}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Remaining</span>
                    </div>
                    <p className="text-lg font-medium text-white">{loanDetails.remaining}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/30 hover:border-violet-500/30 transition-all duration-300 order-2">
            <CardHeader>
              <CardTitle>Collateral Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-gray-800/40">
                  <span className="text-gray-400">Collection</span>
                  <span className="text-white font-medium">{loanDetails.collateral}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-gray-800/40">
                  <span className="text-gray-400">Token ID</span>
                  <span className="text-white font-medium">#1234</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-gray-800/40">
                  <span className="text-gray-400">Floor Value</span>
                  <span className="text-white font-medium">{loanDetails.collateralValue}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/30 hover:border-violet-500/30 transition-all duration-300 order-3">
            <CardHeader>
              <CardTitle>Loan Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-gray-800/40 border border-gray-700/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Health Factor</span>
                    <span className="text-green-400 font-medium">{loanDetails.healthFactor}</span>
                  </div>
                  <div className="w-full bg-gray-700/50 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full" style={{ width: `${(parseFloat(loanDetails.healthFactor) / 2) * 100}%` }} />
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-gray-800/40">
                  <span className="text-gray-400">Start Date</span>
                  <span className="text-white font-medium">{loanDetails.startDate}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-gray-800/40">
                  <span className="text-gray-400">End Date</span>
                  <span className="text-white font-medium">{loanDetails.endDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/30 hover:border-violet-500/30 transition-all duration-300 order-4 lg:col-span-2">
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loanDetails.paymentHistory.map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-gray-800/40 border border-gray-700/30">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-gray-700/50">
                        <History className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{payment.type}</p>
                        <p className="text-sm text-gray-400">{payment.date}</p>
                      </div>
                    </div>
                    <p className="text-white font-medium">{payment.amount}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
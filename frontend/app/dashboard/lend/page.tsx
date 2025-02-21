"use client"

import { useState } from 'react';
import { Wallet, TrendingUp, Users, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function LendPage() {
  const [lendingOpportunities] = useState([
    {
      id: "1",
      nftName: "Bored Ape #1234",
      collateral: "BAYC",
      requestedAmount: "45.5 ETH",
      minInterest: "4.5%",
      timeLeft: "2 days",
      borrower: "0x1234...5678",
      status: "active"
    },
    {
      id: "2",
      nftName: "Azuki #4567",
      collateral: "AZUKI",
      requestedAmount: "30 ETH",
      minInterest: "4.0%",
      timeLeft: "3 days",
      borrower: "0x8765...4321",
      status: "active"
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-gradient-radial from-violet-600/20 via-transparent to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-gradient-radial from-blue-600/20 via-transparent to-transparent rounded-full blur-3xl animate-pulse-slow delay-500"></div>
      </div>

      <div className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-3">
          <Card className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/30 hover:border-violet-500/30 transition-all duration-300">
            <CardContent className="p-4 pt-6 flex">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/20">
                  <Wallet className="w-6 h-6 text-violet-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Available</p>
                  <p className="text-xl font-bold text-white mt-1">75.5 ETH</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/30 hover:border-violet-500/30 transition-all duration-300">
            <CardContent className="p-4 pt-6 flex">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20">
                  <TrendingUp className="w-6 h-6 text-fuchsia-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Avg. Interest Rate</p>
                  <p className="text-xl font-bold text-white mt-1">4.25%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/30 hover:border-violet-500/30 transition-all duration-300">
            <CardContent className="p-4 pt-6 flex">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Active Borrowers</p>
                  <p className="text-xl font-bold text-white mt-1">{lendingOpportunities.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-screen mx-auto">
          <div className="hidden md:block overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="py-4 px-6 text-left text-sm font-medium text-gray-400">NFT</th>
                  <th className="py-4 px-6 text-left text-sm font-medium text-gray-400">Requested Amount</th>
                  <th className="py-4 px-6 text-center text-sm font-medium text-gray-400">Min Interest</th>
                  <th className="py-4 px-6 text-center text-sm font-medium text-gray-400">Time Left</th>
                  <th className="py-4 px-6 text-right text-sm font-medium text-gray-400">Action</th>
                </tr>
              </thead>
              <tbody>
                {lendingOpportunities.map((opportunity) => (
                  <tr 
                    key={opportunity.id} 
                    className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-violet-500/10 rounded-xl flex items-center justify-center text-violet-500 font-medium">
                          NFT
                        </div>
                        <div>
                          <span className="font-medium text-white block">{opportunity.nftName}</span>
                          <span className="text-sm text-gray-400">{opportunity.borrower}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-white font-medium">{opportunity.requestedAmount}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex justify-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-500/10 text-green-400">
                          {opportunity.minInterest}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex justify-center">
                        <span className="text-gray-400">{opportunity.timeLeft}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link href={`/dashboard/lend/${opportunity.id}`}>
                        <button className="inline-flex items-center px-3 py-1.5 rounded-lg bg-violet-500/10 text-violet-400 text-sm font-medium transition-all duration-300 hover:bg-violet-500/20">
                          Place Bid
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden space-y-4">
            {lendingOpportunities.map((opportunity) => (
              <Link 
                key={opportunity.id} 
                href={`/dashboard/lend/${opportunity.id}`}
              >
                <div className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4 space-y-4 hover:border-violet-500/30 transition-all duration-300 mt-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-violet-500/10 rounded-xl flex items-center justify-center text-violet-500 font-medium">
                        NFT
                      </div>
                      <div>
                        <span className="font-medium text-white block">{opportunity.nftName}</span>
                        <span className="text-sm text-gray-400">{opportunity.borrower}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-violet-400" />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 pt-2 border-t border-gray-700/50">
                    <div>
                      <span className="text-sm text-gray-400 block">Amount</span>
                      <span className="text-white font-medium">{opportunity.requestedAmount}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-400 block">Min Interest</span>
                      <span className="text-green-400 font-medium">{opportunity.minInterest}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-400 block">Time Left</span>
                      <span className="text-white font-medium">{opportunity.timeLeft}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
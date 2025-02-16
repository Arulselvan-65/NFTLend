"use client"

import { useState } from 'react';
import {
  Wallet,
  Clock,
  Shield,
  Plus,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function BorrowPage() {
  const [borrowRequests, setBorrowRequests] = useState([
    {
      id: "1",
      nftName: "Bored Ape #1234",
      collateral: "BAYC",
      requestedAmount: "45.5 ETH",
      bestOffer: "43.2 ETH",
      interest: "5.2%",
      totalBids: 3,
      status: "pending" as "pending"
    },
    {
      id: "2",
      nftName: "Azuki #4567",
      collateral: "AZUKI",
      requestedAmount: "30 ETH",
      bestOffer: "28.5 ETH",
      interest: "4.8%",
      totalBids: 2,
      status: "pending" as "pending"
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-gradient-radial from-violet-600/20 via-transparent to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-gradient-radial from-blue-600/20 via-transparent to-transparent rounded-full blur-3xl animate-pulse-slow delay-500"></div>
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6">
          <span className="px-3 py-1.5 text-sm font-medium text-violet-400 bg-violet-500/10 rounded-full border border-violet-500/20">
            {borrowRequests.length} Active Requests
          </span>
          <Link href="/dashboard/borrow/new">
            <button className="px-4 py-2 rounded-xl bg-gray-800/50 backdrop-blur-xl border border-violet-500/20 text-violet-400 font-medium transition-all duration-300 hover:bg-violet-500/20 hover:border-violet-500/30 hover:text-violet-300">
              <span className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                <span>Create Request</span>
              </span>
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/30 hover:border-violet-500/30 transition-all duration-300">
            <CardContent className="p-4 pt-6 flex">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/20">
                  <Wallet className="w-6 h-6 text-violet-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Requested</p>
                  <p className="text-xl font-bold text-white mt-1">75.5 ETH</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/30 hover:border-violet-500/30 transition-all duration-300">
            <CardContent className="p-4 pt-6 flex">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20">
                  <Clock className="w-6 h-6 text-fuchsia-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Active Requests</p>
                  <p className="text-xl font-bold text-white mt-1">{borrowRequests.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/30 hover:border-violet-500/30 transition-all duration-300">
            <CardContent className="p-4 pt-6 flex">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <Shield className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Bids</p>
                  <p className="text-xl font-bold text-white mt-1">5</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-screen-xl mx-auto">
          {/* Desktop view */}
          <div className="hidden md:block overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="py-4 px-6 text-left text-sm font-medium text-gray-400">NFT</th>
                  <th className="py-4 px-6 text-left text-sm font-medium text-gray-400">Requested Amount</th>
                  <th className="py-4 px-6 text-center text-sm font-medium text-gray-400">Total Bids</th>
                  <th className="py-4 px-6 text-right text-sm font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {borrowRequests.map((request) => (
                  <tr 
                    key={request.id} 
                    className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-violet-500/10 rounded-xl flex items-center justify-center text-violet-500 font-medium">
                          NFT
                        </div>
                        <span className="font-medium text-white">{request.nftName}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-white font-medium">{request.requestedAmount}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex justify-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-violet-500/10 text-white">
                          {request.totalBids} bids
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link href={`/dashboard/borrow/${request.id}/bids`}>
                        <button className="inline-flex items-center px-3 py-1.5 rounded-lg bg-violet-500/10 text-violet-400 text-sm font-medium transition-all duration-300 hover:bg-violet-500/20">
                          Review Bids
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile view */}
          <div className="md:hidden space-y-4">
            {borrowRequests.map((request) => (
              <div 
                key={request.id}
                className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-violet-500/10 rounded-xl flex items-center justify-center text-violet-500 font-medium">
                      NFT
                    </div>
                    <span className="font-medium text-white">{request.nftName}</span>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-violet-500/10 text-white">
                    {request.totalBids} bids
                  </span>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t border-gray-700/50">
                  <div>
                    <span className="text-sm text-gray-400">Requested Amount</span>
                    <p className="text-white font-medium mt-1">{request.requestedAmount}</p>
                  </div>
                  <Link href={`/dashboard/borrow/${request.id}/bids`}>
                    <button className="inline-flex items-center px-3 py-1.5 rounded-lg bg-violet-500/10 text-violet-400 text-sm font-medium transition-all duration-300 hover:bg-violet-500/20">
                      Review Bids
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>

  );
}
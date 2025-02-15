"use client"

import { useState } from 'react';
import {
  Wallet,
  Clock,
  ArrowUpRight,
  Shield,
  AlertCircle,
  Plus,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/CustomCard';

export default function LoansPage() {
  const [activeLoans, setActiveLoans] = useState([
    {
      id: 1,
      nftName: "Bored Ape #1234",
      amount: "45.5 ETH",
      interest: "5.2%",
      duration: "30 days",
      remaining: "22 days",
      status: "active",
      collateral: "BAYC",
    },
    {
      id: 2,
      nftName: "Azuki #4567",
      amount: "12.8 ETH",
      interest: "4.8%",
      duration: "14 days",
      remaining: "7 days",
      status: "warning",
      collateral: "AZUKI",
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Background gradients */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-gradient-radial from-violet-600/20 via-transparent to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-gradient-radial from-blue-600/20 via-transparent to-transparent rounded-full blur-3xl animate-pulse-slow delay-500"></div>
      </div>

      <div className="relative z-10">
        {/* Modified Header Section */}
        <div className="relative mb-8">
          {/* Decorative gradient line */}
          <div className="absolute -left-8 -right-8 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

          <div className="flex justify-between items-center h-16">
            {/* Left side - Just the stats badge */}
            <div className="flex items-center">
              <span className="px-3 py-1.5 text-sm font-medium text-violet-400 bg-violet-500/10 rounded-full border border-violet-500/20">
                {activeLoans.length} Active Loans
              </span>
            </div>

            {/* Right side - Action button */}
            <button className="group relative px-4 py-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/25">
              <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                <span>New Loan</span>
              </span>
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/30 hover:border-violet-500/30 transition-all duration-300">
            <CardContent className="p-4 pt-6 flex">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/20">
                  <Wallet className="w-6 h-6 text-violet-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Borrowed</p>
                  <p className="text-xl font-bold text-white mt-1">58.3 ETH</p>
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
                  <p className="text-sm text-gray-400">Active Loans</p>
                  <p className="text-xl font-bold text-white mt-1">2</p>
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
                  <p className="text-sm text-gray-400">Collateral Value</p>
                  <p className="text-xl font-bold text-white mt-1">95.2 ETH</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Loans */}
        <Card className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/30 hover:border-violet-500/30 transition-all duration-300">
          <CardHeader>
            <CardTitle>Active Loans</CardTitle>
            <CardDescription>Your current loan positions and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeLoans.map((loan) => (
                <div key={loan.id} className="p-4 rounded-xl bg-gray-800/40 border border-gray-700/30 hover:border-violet-500/30 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center">
                        <span className="text-white font-bold">{loan.collateral[0]}</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{loan.nftName}</h3>
                        <p className="text-sm text-gray-400">Collateral: {loan.collateral}</p>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors text-sm text-gray-300">
                      View Details
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Borrowed Amount</p>
                      <p className="text-white font-medium mt-1">{loan.amount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Interest Rate</p>
                      <p className="text-white font-medium mt-1">{loan.interest}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Duration</p>
                      <p className="text-white font-medium mt-1">{loan.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Time Remaining</p>
                      <div className="flex items-center gap-2 mt-1">
                        {loan.status === 'warning' && (
                          <AlertCircle className="w-4 h-4 text-orange-500" />
                        )}
                        <p className={`font-medium ${loan.status === 'warning' ? 'text-orange-500' : 'text-white'}`}>
                          {loan.remaining}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
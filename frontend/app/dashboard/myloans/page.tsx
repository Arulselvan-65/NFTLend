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
import { Card, CardContent } from '@/components/ui/card';
import { ActiveLoansCard } from "@/components/loans/LoansCard";

import Link from 'next/link';

export default function LoansPage() {
  const [activeLoans, setActiveLoans] = useState([
    {
      id: "1",
      nftName: "Bored Ape #1234",
      collateral: "BAYC",
      amount: "45.5 ETH",
      interest: "5.2%",
      duration: "30 days",
      remaining: "22 days",
      status: "normal" as "normal"  
    },
    {
      id: "2",
      nftName: "Azuki #4567",
      collateral: "AZUKI",
      amount: "12.8 ETH",
      interest: "4.8%",
      duration: "14 days",
      remaining: "7 days",
      status: "warning" as "warning"
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-gradient-radial from-violet-600/20 via-transparent to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-gradient-radial from-blue-600/20 via-transparent to-transparent rounded-full blur-3xl animate-pulse-slow delay-500"></div>
      </div>

      <div className="relative z-10">
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

        <ActiveLoansCard activeLoans={activeLoans} />
      </div>
    </div>
  );
}

"use client"

import { useState } from 'react';
import { Wallet, Clock, ArrowLeft, History, Tag, Percent, Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
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

  const [paymentAmount, setPaymentAmount] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handlePayment = () => {
    console.log(`Processing payment of ${paymentAmount} ETH`);
    setIsDialogOpen(false);
    setPaymentAmount("");
  };

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-gradient-radial from-violet-600/20 via-transparent to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-gradient-radial from-blue-600/20 via-transparent to-transparent rounded-full blur-3xl animate-pulse-slow delay-500"></div>
      </div>

      <div className="relative z-10 mx-auto">
        <div className="relative mb-6 sm:mb-8">
          <div className="absolute -left-4 sm:-left-8 -right-4 sm:-right-8 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 h-auto sm:h-16">
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
                  <h1 className="text-lg sm:text-xl font-bold text-white">{loanDetails.nftName}</h1>
                  <p className="text-xs sm:text-sm text-gray-400">Loan #{loanDetails.id}</p>
                </div>
              </div>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <button className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-emerald-500 text-white font-medium text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-300 hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/20">
                  <Wallet className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Repay Loan</span>
                </button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 border-gray-700 text-white mx-4 sm:mx-0">
                <DialogHeader>
                  <DialogTitle>Make a Payment</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Payment Amount (ETH)</label>
                      <input
                        type="text"
                        step="0.001"
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl bg-gray-700 border border-gray-600 text-white focus:outline-none"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <button
                    onClick={handlePayment}
                    className="w-full sm:w-auto px-6 py-2 rounded-xl bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!paymentAmount}
                  >
                    Confirm Payment
                  </button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Card className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/30 transition-all duration-300 order-1 lg:col-span-2">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Loan Overview</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Tag className="w-4 h-4" />
                    <span className="text-xs sm:text-sm">Lender Address</span>
                  </div>
                  <p className="text-sm sm:text-lg font-medium text-white break-words">{loanDetails.lenderAddress}</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                  {[
                    { icon: <Wallet className="w-4 h-4" />, label: "Borrowed", value: loanDetails.amount },
                    { icon: <Percent className="w-4 h-4" />, label: "Interest Rate", value: loanDetails.interest },
                    { icon: <Calendar className="w-4 h-4" />, label: "Duration", value: loanDetails.duration },
                    { icon: <Clock className="w-4 h-4" />, label: "Remaining", value: loanDetails.remaining }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-400">
                        {item.icon}
                        <span className="text-xs sm:text-sm">{item.label}</span>
                      </div>
                      <p className="text-sm sm:text-lg font-medium text-white">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/30 transition-all duration-300 order-2">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Collateral Information</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                {[
                  { label: "Collection", value: loanDetails.collateral },
                  { label: "Token ID", value: "#1234" },
                  { label: "Floor Value", value: loanDetails.collateralValue }
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-2.5 sm:p-3 rounded-lg bg-gray-800/40">
                    <span className="text-sm text-gray-400">{item.label}</span>
                    <span className="text-sm sm:text-base text-white font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/30 transition-all duration-300 order-3">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Loan Health</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                <div className="p-3 sm:p-4 rounded-xl bg-gray-800/40 border border-gray-700/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Health Factor</span>
                    <span className="text-sm sm:text-base text-green-400 font-medium">{loanDetails.healthFactor}</span>
                  </div>
                  <div className="w-full bg-gray-700/50 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full" 
                      style={{ width: `${(parseFloat(loanDetails.healthFactor) / 2) * 100}%` }} 
                    />
                  </div>
                </div>
                {[
                  { label: "Start Date", value: loanDetails.startDate },
                  { label: "End Date", value: loanDetails.endDate }
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-2.5 sm:p-3 rounded-lg bg-gray-800/40">
                    <span className="text-sm text-gray-400">{item.label}</span>
                    <span className="text-sm sm:text-base text-white font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/30 transition-all duration-300 order-4 lg:col-span-2">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Payment History</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                {loanDetails.paymentHistory.map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-gray-800/40 border border-gray-700/30">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="p-2 rounded-lg bg-gray-700/50">
                        <History className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm sm:text-base text-white font-medium">{payment.type}</p>
                        <p className="text-xs sm:text-sm text-gray-400">{payment.date}</p>
                      </div>
                    </div>
                    <p className="text-sm sm:text-base text-white font-medium">{payment.amount}</p>
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
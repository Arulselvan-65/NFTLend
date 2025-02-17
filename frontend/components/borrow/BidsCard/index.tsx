import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Shield, Clock, ArrowUpRight, AlertCircle } from 'lucide-react';

interface Bid {
    id: string,
    lender: string,
    bidAmount: string,
    interestRate: string,
    timestamp: any,
    deadline: any
}

interface BidsCardProps {
  bids: Bid[],
  onAcceptBid: any
}

const formatTimeRemaining = (deadline: any) => {
  const now = new Date();
  const diff = deadline - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours <= 1) {
    return { text: `${minutes}m left`, warning: true };
  }
  return { text: `${hours}h ${minutes}m left`, warning: false };
};

export const BidsCard = ({ bids, onAcceptBid }: BidsCardProps) => {
  return (
    <Card className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl border border-gray-700/30 shadow-xl">
      <CardHeader className="border-b border-gray-700/50 pb-4">
        <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
          <Shield className="w-5 h-5 text-violet-400" />
          Active Bids
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="divide-y divide-gray-700/50">
          {bids.map((bid) => {
            const timeRemaining = formatTimeRemaining(new Date(bid.deadline));
            
            return (
              <div key={bid.id} className="p-6 hover:bg-gray-800/40 transition-all duration-200 group">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
                      <span className="text-violet-300 font-semibold text-lg">
                        {bid.lender.slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg mb-1">
                        {bid.lender}
                      </h3>
                      <span className="text-gray-400 text-sm">Verified Lender</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => onAcceptBid(bid.id)}
                    className="px-6 py-3 rounded-xl bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/20 text-violet-400 font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/10"
                  >
                    Accept Offer
                  </button>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700 group-hover:border-gray-600 transition-colors duration-200">
                    <div className="text-gray-400 mb-2 text-sm">
                      Time Remaining
                    </div>
                    <div className="flex items-center gap-2">
                      {timeRemaining.warning ? (
                        <AlertCircle className="w-5 h-5 text-amber-500" />
                      ) : (
                        <Clock className="w-5 h-5 text-gray-400" />
                      )}
                      <span className={`font-medium text-lg ${
                        timeRemaining.warning 
                          ? 'text-amber-500' 
                          : 'text-white'
                      }`}>
                        {timeRemaining.text}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700 group-hover:border-gray-600 transition-colors duration-200">
                    <div className="text-gray-400 mb-2 text-sm">
                      APR
                    </div>
                    <div className="font-medium text-lg text-white flex items-center gap-2">
                      {bid.interestRate}
                      <span className="text-emerald-400 text-sm font-normal">↓ 2.5%</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700 group-hover:border-gray-600 transition-colors duration-200">
                    <div className="text-gray-400 mb-2 text-sm">
                      Offer Amount
                    </div>
                    <div className="font-medium text-lg text-white">
                      {bid.bidAmount}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700 group-hover:border-gray-600 transition-colors duration-200">
                    <div className="text-gray-400 mb-2 text-sm">
                      Deadline
                    </div>
                    <div className="font-medium text-lg text-white">
                      1 day
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between text-gray-400 cursor-pointer hover:text-gray-300 transition-colors duration-200">
                  <span className="text-sm font-medium">View complete offer details</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default BidsCard;
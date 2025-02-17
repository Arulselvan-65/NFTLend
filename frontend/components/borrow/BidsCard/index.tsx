import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

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

interface BidsCardProps {
  bids: Bid[];
  onAcceptBid: (bid: Bid) => void;
}

export const BidsCard = ({ bids, onAcceptBid }: BidsCardProps) => {
  return (
    <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
      <CardHeader className="border-b border-gray-100 dark:border-gray-800 !p-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
              Active Bids
            </CardTitle>
            <CardDescription className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {bids.length} Active Position{bids.length !== 1 ? 's' : ''}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="!p-0">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bids.map((bid) => (
            <div key={bid.id} className="group">
              <div className="mt-4 h-full p-5 rounded-lg md:border-none border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 hover:shadow-sm">
                <div className="flex items-start mb-5">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="h-12 w-12 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 dark:text-blue-400 font-medium text-lg">
                        {bid.collateral[0]}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white truncate text-lg">
                        {bid.nftName}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {bid.lender}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                    <div className="text-gray-500 dark:text-gray-400 text-xs">
                      Amount
                    </div>
                    <div className="font-medium text-gray-900 dark:text-white text-base mt-1">
                      {bid.amount}
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                    <div className="text-gray-500 dark:text-gray-400 text-xs">
                      Interest Rate
                    </div>
                    <div className="font-medium text-gray-900 dark:text-white text-base mt-1">
                      {bid.interestRate}
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <button
                    onClick={() => onAcceptBid(bid)}
                    className="w-full px-4 py-3 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-sm font-medium flex items-center justify-center gap-2 transition-colors hover:bg-emerald-500/20"
                  >
                    Accept Bid
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BidsCard;
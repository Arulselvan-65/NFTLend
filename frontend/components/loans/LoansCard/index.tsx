import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, AlertCircle, Clock, ChevronRight } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

interface Loan {
  id: string;
  nftName: string;
  collateral: string;
  amount: string;
  interest: string;
  duration: string;
  remaining: string;
  status: 'normal' | 'warning';
}

interface ActiveLoansCardProps {
  activeLoans: Loan[];
}

export const ActiveLoansCard = ({ activeLoans }: ActiveLoansCardProps) => {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="border-b border-gray-800 !p-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-white">
              Active Loans
            </CardTitle>
            <CardDescription className="text-sm text-gray-400">
              {activeLoans.length} Active Position{activeLoans.length !== 1 ? 's' : ''}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="!p-0">
        <div className="space-y-4">
          {activeLoans.map((loan) => (
            <Link 
              key={loan.id}
              href={`/dashboard/myloans/${loan.id}/details`}
              className="block group"
            >
              <div className="p-4 rounded-lg md:border-none border border-gray-700 bg-gray-800/50 hover:border-gray-600 transition-all duration-200 relative hover:shadow-sm">
                <div className="absolute right-4 top-4 px-2 py-1 rounded-full text-xs font-medium bg-emerald-900/20 text-emerald-400 border border-emerald-800">
                  Active Loan
                </div>

                <div className="flex items-start mb-6">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="h-12 w-12 md:h-10 md:w-10 rounded-lg bg-blue-900/20 border border-blue-800 flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-400 font-medium text-lg md:text-base">
                        {loan.collateral[0]}
                      </span>
                    </div>
                    <div className="min-w-0 pr-16">
                      <h3 className="font-medium text-white truncate text-base">
                        {loan.nftName}
                      </h3>
                      <p className="text-sm text-gray-400 truncate">
                        {loan.collateral}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 rounded-lg bg-gray-800/50 border md:border-none  border-gray-700">
                    <div className="text-gray-400 mb-1 text-xs">
                      Borrowed
                    </div>
                    <div className="font-medium text-white text-base">
                      {loan.amount}
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-gray-800/50 border md:border-none  border-gray-700">
                    <div className="text-gray-400 mb-1 text-xs">
                      Interest Rate
                    </div>
                    <div className="font-medium text-white text-base">
                      {loan.interest}
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-gray-800/50 border md:border-none  border-gray-100 dark:border-gray-700">
                    <div className="text-gray-500 dark:text-gray-400 mb-1 text-xs">
                      Duration
                    </div>
                    <div className="font-medium text-gray-900 dark:text-white text-base">
                      {loan.duration}
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-gray-800/50 border md:border-none  border-gray-100 dark:border-gray-700">
                    <div className="text-gray-500 dark:text-gray-400 mb-1 text-xs">
                      Remaining Time
                    </div>
                    <div className="flex items-center gap-1.5">
                      {loan.status === 'warning' ? (
                        <AlertCircle className="w-4 h-4 text-amber-500" />
                      ) : (
                        <Clock className="w-4 h-4 text-gray-400" />
                      )}
                      <span className={`font-medium text-base ${
                        loan.status === 'warning' 
                          ? 'text-amber-500' 
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {loan.remaining}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    View loan details
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
                    <span className="text-sm">Details</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};


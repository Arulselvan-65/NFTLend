// components/LoanTable.tsx
"use client"

import { RefreshCw } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/CustomCard";

interface Loan {
  id: number;
  borrower: string;
  collection: string;
  amount: string;
  interest: string;
  status: string;
}

interface LoanTableProps {
  loans: Loan[];
  onRefresh: () => void;
  className?: string;
}

const LoanTable = ({ loans, onRefresh, className }: LoanTableProps) => {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">
              Recent Loans
            </CardTitle>
            <CardDescription className="text-gray-400">
              Latest lending activity on the platform
            </CardDescription>
          </div>
          <button 
            onClick={onRefresh}
            className="p-2 hover:bg-gray-700/50 rounded-full transition-colors duration-200 group"
          >
            <RefreshCw className="h-5 w-5 text-gray-400 group-hover:text-violet-500 transition-colors duration-200" />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700/50">
                <th className="text-left py-4 px-4 font-medium text-gray-400">Loan ID</th>
                <th className="text-left py-4 px-4 font-medium text-gray-400">Borrower</th>
                <th className="text-left py-4 px-4 font-medium text-gray-400">NFT Collection</th>
                <th className="text-right py-4 px-4 font-medium text-gray-400">Amount</th>
                <th className="text-right py-4 px-4 font-medium text-gray-400">Interest</th>
                <th className="text-right py-4 px-4 font-medium text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr 
                  key={loan.id} 
                  className="border-b border-gray-700/50 hover:bg-gray-800/30 transition-colors duration-200"
                >
                  <td className="py-4 px-4 text-gray-300">#{loan.id}</td>
                  <td className="py-4 px-4 text-gray-300">{loan.borrower}</td>
                  <td className="py-4 px-4 text-gray-300">{loan.collection}</td>
                  <td className="py-4 px-4 text-right font-medium text-gray-300">
                    {loan.amount}
                  </td>
                  <td className="py-4 px-4 text-right text-gray-300">{loan.interest}</td>
                  <td className="py-4 px-4 text-right">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 text-violet-400 border border-violet-500/30">
                      {loan.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoanTable;
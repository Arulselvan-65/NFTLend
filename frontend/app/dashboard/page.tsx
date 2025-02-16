"use client"

import { useState } from 'react';
import {
  Wallet,
  BarChart3,
  Activity,
  DollarSign,
  ShieldCheck,
  Plus,
} from 'lucide-react';

import StatsCard from '@/components/dashboard/stats-card';
import ActivityChart from '@/components/dashboard/activity-chart';
import LoanTable from '@/components/dashboard/loan-table';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function DashboardPage() {
  const [balance, setBalance] = useState('0');

  const activityData = [
    { name: 'Mon', value: 4 },
    { name: 'Tue', value: 7 },
    { name: 'Wed', value: 5 },
    { name: 'Thu', value: 8 },
    { name: 'Fri', value: 12 },
    { name: 'Sat', value: 9 },
    { name: 'Sun', value: 6 },
  ];

  const mockLoans = Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    borrower: '0x1234...5678',
    collection: 'Bored Apes',
    amount: '2.5 ETH',
    interest: '5.2%',
    status: 'Active'
  }));

  const handleRefresh = () => {
    console.log('Refreshing data...');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Background gradients matching landing page */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-gradient-radial from-violet-600/20 via-transparent to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-gradient-radial from-blue-600/20 via-transparent to-transparent rounded-full blur-3xl animate-pulse-slow delay-500"></div>
      </div>

      <div className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Balance"
            value={`${parseFloat(balance).toFixed(4)} ETH`}
            description="+20.1% from last month"
            icon={DollarSign}
            className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/30 hover:border-violet-500/30 transition-all duration-300"
          />
          <StatsCard
            title="Active Loans"
            value="24"
            description="+12 since last week"
            icon={Activity}
            className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/30 hover:border-violet-500/30 transition-all duration-300"
          />
          <StatsCard
            title="Total Value Locked"
            value="156.4 ETH"
            description="+4.3% from last week"
            icon={ShieldCheck}
            className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/30 hover:border-violet-500/30 transition-all duration-300"
          />
          <StatsCard
            title="Avg. Interest Rate"
            value="5.2%"
            description="-0.5% from last month"
            icon={BarChart3}
            className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/30 hover:border-violet-500/30 transition-all duration-300"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/30 hover:border-violet-500/30 transition-all duration-300">
            <CardHeader>
              <CardTitle >
                Weekly Activity
              </CardTitle>
              <CardDescription className="text-gray-400">
                Number of new loans per day
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ActivityChart data={activityData} />
            </CardContent>
          </Card>

          <Card className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/30 hover:border-violet-500/30 transition-all duration-300">
            <CardHeader>
              <CardTitle>
                Recent Activity
              </CardTitle>
              <CardDescription className="text-gray-400">
                Latest transactions and updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center p-4 bg-gray-800/40 rounded-lg border border-gray-700/30">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 flex items-center justify-center mr-4">
                      <Activity className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white">
                        New loan created #{i}
                      </h4>
                      <p className="text-xs text-gray-400">
                        2 minutes ago
                      </p>
                    </div>
                    <div className="ml-auto text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">
                      1.5 ETH
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/30 hover:border-violet-500/30 transition-all duration-300 mb-16">
          <CardHeader>
            <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">
              Active Loans
            </CardTitle>
            <CardDescription className="text-gray-400">
              Manage your current loan positions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoanTable loans={mockLoans} onRefresh={handleRefresh} />
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
"use client"

  import { useState, useEffect } from 'react';
  import { ethers } from 'ethers';
  import { 
    Wallet, 
    BarChart3, 
    Activity,
    DollarSign,
    ShieldCheck,
    Plus,
    RefreshCw
  } from 'lucide-react';
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/CustomCard";
  import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
  
  export default function NFTLendingDashboard() {
    const [account, setAccount] = useState('');
    const [chainId, setChainId] = useState('');
    const [balance, setBalance] = useState('0');
    const [loading, setLoading] = useState(true);
    const [loans, setLoans] = useState([]);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [networkStatus, setNetworkStatus] = useState('connected');
  
    // Mock data for charts
    const activityData = [
      { name: 'Mon', value: 4 },
      { name: 'Tue', value: 7 },
      { name: 'Wed', value: 5 },
      { name: 'Thu', value: 8 },
      { name: 'Fri', value: 12 },
      { name: 'Sat', value: 9 },
      { name: 'Sun', value: 6 },
    ];
  
    // const connectWallet = async () => {
    //   try {
    //     if (window.ethereum) {
    //       const accounts = await window.ethereum.request({
    //         method: 'eth_requestAccounts'
    //       });
    //       const provider = new ethers.BrowserProvider(window.ethereum);
    //       const network = await provider.getNetwork();
    //       const balance = await provider.getBalance(accounts[0]);
          
    //       setAccount(accounts[0]);
    //       setChainId(network.chainId.toString());
    //       setBalance(ethers.formatEther(balance));
    //       setLoading(false);
    //     }
    //   } catch (err) {
    //     console.error(err);
    //   }
    // };
  
    // useEffect(() => {
    //   connectWallet();
    // }, []);
  
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Sidebar */}
        <div className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg">
          <div className="p-4">
            <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">NFT Lending</h1>
            <div className="mt-8 space-y-2">
              {['dashboard', 'loans', 'offers', 'history', 'settings'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full text-left px-4 py-2 rounded-lg capitalize ${
                    activeTab === tab 
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
  
        {/* Main Content */}
        <div className="ml-64 p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold dark:text-white">Dashboard</h2>
              <p className="text-gray-500 dark:text-gray-400">Welcome back!</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className={`w-2 h-2 rounded-full ${
                  networkStatus === 'connected' ? 'bg-green-500' : 'bg-red-500'
                } mr-2`} />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {chainId ? `Chain ID: ${chainId}` : 'Not Connected'}
                </span>
              </div>
              
              <button
                // onClick={connectWallet}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Wallet className="w-4 h-4 mr-2" />
                {account 
                  ? `${account.slice(0, 6)}...${account.slice(-4)}`
                  : 'Connect Wallet'
                }
              </button>
            </div>
          </div>
  
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{parseFloat(balance).toFixed(4)} ETH</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
  
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Loans</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">
                  +12 since last week
                </p>
              </CardContent>
            </Card>
  
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Value Locked</CardTitle>
                <ShieldCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156.4 ETH</div>
                <p className="text-xs text-muted-foreground">
                  +4.3% from last week
                </p>
              </CardContent>
            </Card>
  
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Interest Rate</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5.2%</div>
                <p className="text-xs text-muted-foreground">
                  -0.5% from last month
                </p>
              </CardContent>
            </Card>
          </div>
  
          {/* Charts and Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Activity</CardTitle>
                <CardDescription>Number of new loans per day</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={activityData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#2563eb" 
                        strokeWidth={2} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
  
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest transactions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="h-9 w-9 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-4">
                        <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium dark:text-white">
                          New loan created #{i}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          2 minutes ago
                        </p>
                      </div>
                      <div className="ml-auto text-sm font-medium text-blue-600 dark:text-blue-400">
                        1.5 ETH
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
  
          {/* Recent Loans */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Recent Loans</CardTitle>
                  <CardDescription>Latest lending activity on the platform</CardDescription>
                </div>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                  <RefreshCw className="h-5 w-5" />
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b dark:border-gray-700">
                      <th className="text-left py-4 px-4 font-medium">Loan ID</th>
                      <th className="text-left py-4 px-4 font-medium">Borrower</th>
                      <th className="text-left py-4 px-4 font-medium">NFT Collection</th>
                      <th className="text-right py-4 px-4 font-medium">Amount</th>
                      <th className="text-right py-4 px-4 font-medium">Interest</th>
                      <th className="text-right py-4 px-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <tr key={i} className="border-b dark:border-gray-700">
                        <td className="py-4 px-4">#{i}</td>
                        <td className="py-4 px-4">0x1234...5678</td>
                        <td className="py-4 px-4">Bored Apes</td>
                        <td className="py-4 px-4 text-right">2.5 ETH</td>
                        <td className="py-4 px-4 text-right">5.2%</td>
                        <td className="py-4 px-4 text-right">
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
  
        {/* Floating Action Button */}
        <button className="fixed right-8 bottom-8 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700">
          <Plus className="h-6 w-6" />
        </button>
      </div>
    );
  }

import React from 'react';
import { DoorOpen, Wallet, LogOut, PanelLeftOpen, PanelRightOpen } from 'lucide-react';

interface NavbarProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  walletAddress?: string;
  networkStatus?: 'connected' | 'disconnected';
}

const Navbar = ({
  isSidebarOpen,
  onToggleSidebar,
  walletAddress = '',
  networkStatus = 'disconnected'
}: NavbarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-50">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center">

          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isSidebarOpen ? (
              <PanelRightOpen className="w-6 h-6 text-gray-700 dark:text-gray-300 transition-transform duration-300" />
            ) : (
              <PanelLeftOpen className="w-6 h-6 text-gray-700 dark:text-gray-300 transition-transform duration-300" />
            )}
          </button>
        </div>

        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center space-x-2"> 
            <span className="hidden md:block text-lg font-bold text-gray-900 dark:text-white">
              NFTLend
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <div className={`w-2 h-2 rounded-full ${networkStatus === 'connected' ? 'bg-green-500' : 'bg-red-500'
              }`} />
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
              {networkStatus === 'connected' ? 'Connected' : 'Disconnected'}
            </span>
          </div>

          <button className="flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
            <Wallet className="w-4 h-4 mr-2" />
            <span className="text-sm">
              {walletAddress
                ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`
                : 'Connect'
              }
            </span>
          </button>

          <button className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <LogOut className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
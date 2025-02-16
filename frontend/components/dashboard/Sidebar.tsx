"use client"

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Home, Wallet, Gift, History, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  walletAddress?: string;
}

export const Sidebar = ({ isOpen, onClose, walletAddress = '0x1234...5678' }: SidebarProps) => {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen && window.innerWidth <= 768) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, [isOpen]);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
    { id: 'loans', label: 'My Loans', icon: Wallet, path: '/dashboard/loans' },
    { id: 'offers', label: 'Offers', icon: Gift, path: '/dashboard/offers' },
    { id: 'history', label: 'History', icon: History, path: '/dashboard/history' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/dashboard/settings' },
  ];

  const isTabActive = (tabPath: string) => {
    if (tabPath === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(tabPath);
  };

  const handleNavigation = () => {
    // Always call onClose - it will only take effect on mobile due to the Layout logic
    onClose();
  };

  return (
    <div className="fixed inset-0 top-16 pointer-events-none z-40">
      <aside
        className={`
          pointer-events-auto
          absolute top-0 left-0 h-full
          bg-gray-900/95 backdrop-blur-xl border-r border-gray-800 
          transition-transform duration-300 ease-in-out
          touch-none
          ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-800/50">
            <Link href="/" onClick={handleNavigation}>
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">
                NFTLend
              </h1>
            </Link>
            <p className="text-sm text-gray-400 mt-1">Decentralized NFT Lending</p>
          </div>

          <nav className="flex-1 px-3 py-4 overflow-y-auto">
            {tabs.map((tab) => {
              const isActive = isTabActive(tab.path);
              const Icon = tab.icon;

              return (
                <Link
                  key={tab.id}
                  href={tab.path}
                  onClick={handleNavigation}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-xl
                    transition-all duration-200 group relative border-none
                    hover:bg-gray-800/50
                    ${isActive ? 'bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/30' : ''}
                  `}
                >
                  <div
                    className={`
                      p-2 rounded-lg transition-all duration-200
                      ${isActive 
                        ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/20' 
                        : 'bg-gray-800/80 group-hover:bg-gray-700/80'
                      }
                    `}
                  >
                    <Icon
                      className={`
                        h-5 w-5 transition-colors duration-200
                        ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'}
                      `}
                    />
                  </div>
                  <span
                    className={`
                      font-medium transition-colors duration-200
                      ${isActive 
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500' 
                        : 'text-gray-400 group-hover:text-gray-300'
                      }
                    `}
                  >
                    {tab.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-800/50 mt-auto">
            <div className="flex items-center gap-3 px-2 py-2 rounded-xl bg-gray-800/50">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center">
                <Wallet className="h-5 w-5 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-300 truncate">Connected Wallet</p>
                <p className="text-xs text-gray-500 truncate">{walletAddress}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};
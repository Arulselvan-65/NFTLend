"use client"
import React from 'react';
import { ConnectButtonC } from '../ConnectButton';
import { PanelLeftOpen, PanelRightOpen } from 'lucide-react';

interface NavbarProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export const Navbar = ({
  isSidebarOpen,
  onToggleSidebar,
}: NavbarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-gray-800 border-b border-gray-700 z-50">
      <div className="h-full px-4 flex items-center justify-between">
        {/* Left section - Sidebar toggle */}
        <div className="flex items-center">
          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200"
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isSidebarOpen ? (
              <PanelRightOpen className="w-6 h-6 text-gray-300 transition-transform duration-300" />
            ) : (
              <PanelLeftOpen className="w-6 h-6 text-gray-300 transition-transform duration-300" />
            )}
          </button>
        </div>

        {/* Center section - Logo */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center space-x-2">
            <span className="hidden md:block text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">
              {isSidebarOpen ? "" : "NFTLend"}
            </span>
          </div>
        </div>

        {/* Right section - Connect button */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ConnectButtonC />
          </div>
          <div className="block sm:hidden">
            <ConnectButtonC displayType="compact" />
          </div>
        </div>
      </div>
    </nav>
  );
};
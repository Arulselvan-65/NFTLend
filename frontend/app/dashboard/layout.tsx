"use client"
import React, { ReactNode, useState } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Sidebar } from '@/components/dashboard/Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [networkStatus] = useState<'connected' | 'disconnected'>('connected');
  const [walletAddress] = useState('0x1234...5678');

  // Derive active tab from pathname
  const getActiveTab = (path: string) => {
    if (path === '/dashboard') return 'dashboard';
    const match = path.match(/\/dashboard\/(.+)/);
    return match ? match[1] : 'dashboard';
  };

  const activeTab = getActiveTab(pathname);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={toggleSidebar}
        walletAddress={walletAddress}
        networkStatus={networkStatus}
      />

      <Sidebar
        isOpen={isSidebarOpen}
      />

      <main
        className={`transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'md:ml-64' : 'ml-0'
        }`}
      >
        <div className="mt-14 p-4 md:p-8">
          {children}
        </div>
      </main>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-gray-900 bg-opacity-50 z-30 transition-opacity duration-300"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default DashboardLayout;
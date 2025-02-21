"use client"

import React, { ReactNode, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

// Define NavbarProps to match what you're passing to the Navbar component
interface NavbarProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  walletAddress: string;
  networkStatus: 'connected' | 'disconnected';
}

// Define SidebarProps
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  walletAddress: string;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [networkStatus] = useState<'connected' | 'disconnected'>('connected');
  const [walletAddress] = useState('0x1234...5678');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    checkMobile();

    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getActiveTab = (path: string) => {
    if (path === '/dashboard') return 'dashboard';
    const match = path.match(/\/dashboard\/(.+)/);
    return match ? match[1] : 'dashboard';
  };

  const activeTab = getActiveTab(pathname);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="bg-gray-900">
      <Navbar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={toggleSidebar}
      />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleSidebarClose}
        walletAddress={walletAddress}
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

      {isSidebarOpen && isMobile && (
        <div
          className="md:hidden fixed inset-0 bg-gray-900 bg-opacity-50 z-30 transition-opacity duration-300"
          onClick={handleSidebarClose}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default DashboardLayout;
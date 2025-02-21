import type { Metadata } from "next";
import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import { Providers } from '@/utils/providers';
import { GlobalModalProvider } from '@/contexts/GlobalModalState';
import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast';
import { TransactionModalWrapper } from "@/components/TransactionModalWrapper";

export const metadata: Metadata = {
  title: "NFTLend",
  description: "Created by 0xhaider",
  icons: "/favicon.png"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="bg-black text-white font-sans relative">
          <GlobalModalProvider>
            <Providers>
              <main className="min-h-screen">
                {children}
              </main>
              
              {/* React Toastify Container */}
              <ToastContainer
                limit={3}
                position="top-right"
                className="toastContainer"
              />
              
              {/* React Hot Toast Container */}
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 3000,
                  style: {
                    background: '#1f2937',
                    color: '#fff',
                    border: '1px solid rgba(139, 92, 246, 0.1)',
                  },
                  success: {
                    style: {
                      background: '#1f2937',
                      border: '1px solid rgba(34, 197, 94, 0.2)',
                    },
                    iconTheme: {
                      primary: '#22c55e',
                      secondary: '#1f2937',
                    },
                  },
                  error: {
                    style: {
                      background: '#1f2937',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                    },
                    iconTheme: {
                      primary: '#ef4444',
                      secondary: '#1f2937',
                    },
                  },
                }}
              />
              
              <TransactionModalWrapper />
            </Providers>
          </GlobalModalProvider>
        </div>
      </body>
    </html>
  );
}
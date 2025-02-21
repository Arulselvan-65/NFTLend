import React from 'react';
import { Check, Loader, XCircle } from 'lucide-react';


interface TransactionModalProps {
  isOpen: boolean;
  status: 'success' | 'error' | 'loading' | null;
  onClose: () => void;
}
export const TransactionModal = ({ isOpen, status, onClose }: TransactionModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-[#1E1E1E] rounded-xl p-6 max-w-sm w-full mx-4 relative">
        <div className="flex flex-col items-center">
          {status === 'loading' && (
            <>
              <div className="relative mb-4">
                <Loader size={48} className="text-purple-500 animate-spin" />
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                Transaction in Progress
              </h2>
              <p className="text-gray-400 text-center">
                Please wait while your transaction is being processed...
              </p>
              
              <div className="flex gap-2 mt-6">
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className="w-2 h-2 rounded-full bg-purple-500/30 border border-purple-500/50"
                    style={{
                      animation: `bounce 1.5s ease-in-out ${index * 0.2}s infinite`
                    }}
                  />
                ))}
              </div>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="relative mb-4">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Check size={32} className="text-green-500 animate-scale" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-green-500 mb-2">
                Transaction Complete
              </h2>
              <p className="text-gray-400 text-center">
                Your tokens have been successfully minted!
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Close
              </button>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="relative mb-4">
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                  <XCircle size={32} className="text-red-500 animate-scale" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-red-500 mb-2">
                Transaction Failed
              </h2>
              <p className="text-gray-400 text-center">
                There was an error processing your transaction. Please try again.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Close
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

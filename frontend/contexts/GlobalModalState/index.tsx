"use client"
import React, { useState } from 'react';

export const useModalState = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState(null);

  const openModal = (status: any) => {
    setIsModalOpen(true);
    setTransactionStatus(status);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTransactionStatus(null);
    window.location.reload();
  };

  return {
    isModalOpen,
    transactionStatus,
    openModal,
    closeModal,
    setTransactionStatus
  };
};

export const GlobalModalContext = React.createContext({
  isModalOpen: false,
  transactionStatus: null,
  openModal: (status: any) => {},
  closeModal: () => {},
  setTransactionStatus: (status: any) => {}
});

export const useGlobalModalState = () => React.useContext(GlobalModalContext);

export const GlobalModalProvider = ({ children } : {children: React.ReactNode}) => {
  const modalState = useModalState();

  return (
    <GlobalModalContext.Provider value={modalState}>
      {children}
    </GlobalModalContext.Provider>
  );
};

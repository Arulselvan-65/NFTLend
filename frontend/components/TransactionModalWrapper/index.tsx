"use client"
import { TransactionModal } from '../TransactionModal';
import { useGlobalModalState } from '@/contexts/GlobalModalState';

export const TransactionModalWrapper = () => {
  const { isModalOpen, transactionStatus, closeModal } = useGlobalModalState();

  return (
    <TransactionModal
      isOpen={isModalOpen}
      status={transactionStatus}
      onClose={closeModal}
    />
  );
};
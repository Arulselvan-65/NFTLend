export interface Loan {
    id: string;
    nftName: string;
    collateral: string;
    amount: string;
    interest: string;
    duration: string;
    remaining: string;
    status: 'normal' | 'warning';
  }
  
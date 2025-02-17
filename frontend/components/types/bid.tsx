export interface Bid {
    id: string;
    lender: string;
    amount: string;
    interestRate: string;
    timestamp: Date;
    deadline: Date;
    nftName: string;
    collateral: string;
}
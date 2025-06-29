// src/types/Transaction.ts
export interface Transaction {
    id: string;
    description: string;
    dateIssued: string;
    dueDate: string;
    amount: number;
    currency: string;
    status: 'new' | 'paid' | 'cancelled';
}

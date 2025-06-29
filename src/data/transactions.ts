/**
 * Transaction type definition.
 *
 * Describes the structure of a financial transaction between users in the system.
 * Used across the app to represent payments such as rent, deposits, or utility bills.
 *
 * @typedef Transaction
 */

export interface Transaction {
    id: string;
    description: string;
    dateIssued: string;
    dueDate: string;
    amount: number;
    currency: string;
    status: 'new' | 'paid' | 'cancelled';
    tenantId: string;
}

export const transactions: Transaction[] = [
    {
        id: '1',
        description: 'Czynsz za czerwiec',
        dateIssued: '2025-06-01',
        dueDate: '2025-06-10',
        amount: 2500,
        currency: 'PLN',
        status: 'paid',
        tenantId: 'TEN001',
    },
    {
        id: '2',
        description: 'Opłaty za media',
        dateIssued: '2025-06-05',
        dueDate: '2025-06-15',
        amount: 320,
        currency: 'PLN',
        status: 'paid',
        tenantId: 'user1',
    },
    {
        id: '3',
        description: 'Czynsz za lipiec',
        dateIssued: '2025-07-01',
        dueDate: '2025-07-10',
        amount: 2500,
        currency: 'PLN',
        status: 'new',
        tenantId: 'user2',
    },
    {
        id: '4',
        description: 'Internet',
        dateIssued: '2025-07-01',
        dueDate: '2025-07-05',
        amount: 70,
        currency: 'PLN',
        status: 'new',
        tenantId: 'user1',
    },
    {
        id: '5',
        description: 'Czynsz za sierpień',
        dateIssued: '2025-08-01',
        dueDate: '2025-08-10',
        amount: 2600,
        currency: 'PLN',
        status: 'cancelled',
        tenantId: 'user3',
    },
    {
        id: '6',
        description: 'Woda i prąd',
        dateIssued: '2025-06-12',
        dueDate: '2025-06-20',
        amount: 290,
        currency: 'PLN',
        status: 'paid',
        tenantId: 'user3',
    },
    {
        id: '7',
        description: 'Czynsz za maj',
        dateIssued: '2025-05-01',
        dueDate: '2025-05-10',
        amount: 2400,
        currency: 'PLN',
        status: 'cancelled',
        tenantId: 'user3',
    },
    {
        id: '8',
        description: 'Opłata za miejsce parkingowe',
        dateIssued: '2025-07-10',
        dueDate: '2025-07-15',
        amount: 150,
        currency: 'PLN',
        status: 'new',
        tenantId: 'user2',
    }
];

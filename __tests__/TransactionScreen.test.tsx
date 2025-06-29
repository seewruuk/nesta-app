// __tests__/TransactionScreen.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TransactionScreen from '../src/app/transactions/[id]';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useStateContext } from '../src/contexts/StateContext';
import { translation } from '../src/translation';
import type { Transaction } from '../src/types/Transaction';

jest.mock('expo-router', () => ({
    useLocalSearchParams: jest.fn(),
    useRouter: jest.fn(),
}));

jest.mock('../src/contexts/StateContext', () => ({
    useStateContext: jest.fn(),
}));

describe('TransactionScreen', () => {
    const mockBack = jest.fn();
    const mockUpdate = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();

        // default mocks
        (useRouter as jest.Mock).mockReturnValue({ back: mockBack });
        (useLocalSearchParams as jest.Mock).mockReturnValue({ id: 'tx1' });

        (useStateContext as jest.Mock).mockReturnValue({
            state: {
                transactions: [
                    {
                        id: 'tx1',
                        description: 'Test desc',
                        dateIssued: '2025-06-01T00:00:00Z',
                        dueDate: '2025-06-10T00:00:00Z',
                        amount: 150,
                        currency: 'PLN',
                        status: 'new' as Transaction['status'],
                    },
                ],
            },
            updateTransactionStatus: mockUpdate,
            langId: 'pl',
        });
    });

    it('renders transaction details correctly', () => {
        const { getByText } = render(<TransactionScreen />);

        expect(
            getByText(translation.pl.transactions.detailsHeader)
        ).toBeTruthy();
        expect(
            getByText(`Data wystawienia: ${new Date('2025-06-01T00:00:00Z').toLocaleDateString()}`)
        ).toBeTruthy();
        expect(
            getByText(`Termin płatności: ${new Date('2025-06-10T00:00:00Z').toLocaleDateString()}`)
        ).toBeTruthy();
        expect(getByText(`Kwota: 150 PLN`)).toBeTruthy();
        expect(getByText(`Opis: Test desc`)).toBeTruthy();

        // Buttons present
        expect(getByText(translation.pl.transactions.payButton)).toBeTruthy();
        expect(getByText(translation.pl.transactions.cancelButton)).toBeTruthy();
    });

    it('calls updateTransactionStatus and navigates back on Pay', () => {
        const { getByText } = render(<TransactionScreen />);
        fireEvent.press(getByText(translation.pl.transactions.payButton));
        expect(mockUpdate).toHaveBeenCalledWith('tx1', 'paid');
        expect(mockBack).toHaveBeenCalled();
    });

    it('calls updateTransactionStatus and navigates back on Cancel', () => {
        const { getByText } = render(<TransactionScreen />);
        fireEvent.press(getByText(translation.pl.transactions.cancelButton));
        expect(mockUpdate).toHaveBeenCalledWith('tx1', 'cancelled');
        expect(mockBack).toHaveBeenCalled();
    });

    it('renders not found view if transaction missing', () => {
        // override to missing tx
        (useLocalSearchParams as jest.Mock).mockReturnValue({ id: 'unknown' });
        (useStateContext as jest.Mock).mockReturnValue({
            state: { transactions: [] },
            updateTransactionStatus: mockUpdate,
            langId: 'pl',
        });

        const { getByText } = render(<TransactionScreen />);
        expect(getByText(translation.pl.transactions.notFound)).toBeTruthy();
    });
});

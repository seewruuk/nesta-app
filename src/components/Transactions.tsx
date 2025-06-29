/**
 * Transactions list component.
 *
 * Displays up to `maxElements` transactions in a styled card with columns:
 * description, ID, status, date issued, and amount.
 * Each row is pressable, invoking `onPressItem` if provided.
 *
 * @param transactions - Array of Transaction objects to display.
 * @param maxElements - Maximum number of transactions to show (default is 5).
 * @param onPressItem - Optional callback invoked when a transaction row is pressed.
 */

import { Transaction } from '@/src/data/transactions'
import {Pressable, Text, View} from 'react-native'
import { useStateContext } from '@/src/contexts/StateContext';
import {users} from "@/src/data/users";
import {CreatePayment} from "@/src/services/CreatePayment";
import {translation} from "@/src/translation";
import {useMemo} from "react";

interface TransactionsProps {
    transactions: Transaction[]
    maxElements?: number,
    onPressItem?: (transaction: Transaction) => void
}

const STATUS_STYLES: Record<string, string> = {
    'paid': 'bg-green-100 text-green-800',
    'new': 'bg-gray-200 text-gray-600',
    'cancelled': 'bg-yellow-100 text-yellow-800',
}

export default function Transactions({
                                         transactions,
                                         maxElements = 5,
                                         onPressItem,
                                     }: TransactionsProps) {
    const {
        state: { currentUserId }, langId
    } = useStateContext()

    const displayed = transactions.slice(0, maxElements)
    const localeForAmount = `${langId}-${langId.toUpperCase()}`;

    if (displayed.length === 0) {
        return (
            <View className="py-4">
                <Text className="text-gray-500">{translation[langId].transactionsTable.notFound}</Text>
            </View>
        )
    }

    return (
        <View className="bg-white rounded-xl overflow-hidden shadow-sm">

            <View className="flex-row bg-gray-100 px-4 py-3 border-b border-gray-200">
                <Text className="flex-[1.6] font-semibold text-sm">{translation[langId].transactionsTable.description}</Text>
                <Text className="flex-[1.2] font-semibold text-sm">{translation[langId].transactionsTable.id}</Text>
                <Text className="flex-1 font-semibold text-sm">{translation[langId].transactionsTable.status}</Text>
                <Text className="flex-1 font-semibold text-sm">{translation[langId].transactionsTable.date}</Text>
                <Text className="flex-1 font-semibold text-sm text-right">{translation[langId].transactionsTable.price}</Text>
            </View>

            {displayed.map(tx => (
                <Pressable key={tx.id} onPress={() => onPressItem?.(tx)}>
                    <View className="px-4 py-3 border-b border-gray-100 bg-white">
                        <View className="flex-row items-center">
                            <Text className="flex-[1.6] text-sm">{tx.description}</Text>
                            <Text className="flex-[1.2] text-sm text-gray-700">#{tx.id}</Text>
                            <View className="flex-1">
                                <Text
                                    className={`px-2 py-[2px] rounded-full text-xs text-center ${
                                        STATUS_STYLES[tx.status]
                                    }`}
                                >
                                    {tx.status}
                                </Text>
                            </View>
                            <Text className="flex-1 text-sm">{formatDate(tx.dateIssued, langId)}</Text>
                            <Text className="flex-1 text-sm font-semibold text-right">
                                {formatAmount(tx.amount, tx.currency, localeForAmount)}
                            </Text>
                        </View>
                    </View>
                </Pressable>
            ))}
        </View>

    )
}


/**
 * Formats an ISO date string into a human-readable Polish date.
 *
 * @param dateStr - ISO date string (e.g., "2025-06-01T00:00:00Z").
 * @returns Formatted date string like "1 Czerwiec 2025".
 */

function formatDate(dateStr: string, langId: string) {
    const date = new Date(dateStr)
    const months = [
        translation[langId].transactionsTable.january,
        translation[langId].transactionsTable.february,
        translation[langId].transactionsTable.march,
        translation[langId].transactionsTable.april,
        translation[langId].transactionsTable.may,
        translation[langId].transactionsTable.june,
        translation[langId].transactionsTable.july,
        translation[langId].transactionsTable.august,
        translation[langId].transactionsTable.september,
        translation[langId].transactionsTable.october,
        translation[langId].transactionsTable.november,
        translation[langId].transactionsTable.december,
    ]
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
}

/**
 * Formats an amount and currency into a localized string.
 *
 * @param amount - Numeric amount.
 * @param currency - Currency code (e.g., "PLN").
 * @returns Localized amount string like "1 000 PLN".
 */

function formatAmount(amount: number, currency: string, locale: string) {
    return amount.toLocaleString(locale) + ' ' + currency
}
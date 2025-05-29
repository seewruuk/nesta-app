import React from 'react'
import { View, Text } from 'react-native'
import { Transaction } from '@/src/types/Transaction'

interface TransactionsProps {
    transactions: Transaction[]
    maxElements?: number
}

// Mapowanie statusów na style Tailwind
const STATUS_STYLES: Record<string, string> = {
    'Zaksięgowano': 'bg-green-100 text-green-800',
    'Oczekuje na płatność': 'bg-gray-200 text-gray-600',
    'W trakcie': 'bg-yellow-100 text-yellow-800',
}

export default function Transactions({ transactions, maxElements = 5 }: TransactionsProps) {
    const displayed = transactions.slice(0, maxElements)

    if (displayed.length === 0) {
        return (
            <View className="py-4">
                <Text className="text-gray-500">Brak transakcji do wyświetlenia.</Text>
            </View>
        )
    }

    return (
        <View className="bg-white rounded-lg overflow-hidden shadow">
            {/* Nagłówki kolumn */}
            <View className="flex-row bg-gray-50 px-4 py-3">
                <Text className="flex-2 font-semibold">Opis</Text>
                <Text className="flex-1 font-semibold">ID transakcji</Text>
                <Text className="flex-1 font-semibold">Status</Text>
                <Text className="flex-1 font-semibold">Data</Text>
                <Text className="flex-1 font-semibold text-right">Kwota</Text>
            </View>

            {/* Wiersze */}
            {displayed.map((tx) => (
                <View
                    key={tx.id}
                    className="flex-row items-center px-4 py-3 border-t border-gray-100"
                >
                    <Text className="flex-2">{tx.description}</Text>
                    <Text className="flex-1">#{tx.id}</Text>
                    <View className="flex-1">
                        <Text
                            className={`px-2 py-1 rounded-full text-xs ${
                                STATUS_STYLES[tx.status] || ''
                            }`}
                        >
                            {tx.status}
                        </Text>
                    </View>
                    <Text className="flex-1">{formatDate(tx.date)}</Text>
                    <Text className="flex-1 text-right font-semibold">
                        {formatAmount(tx.amount, tx.currency)}
                    </Text>
                </View>
            ))}
        </View>
    )
}

// Pomocnicze funkcje do formatowania
function formatDate(dateStr: string) {
    const date = new Date(dateStr)
    const months = [
        'Styczeń',
        'Luty',
        'Marzec',
        'Kwiecień',
        'Maj',
        'Czerwiec',
        'Lipiec',
        'Sierpień',
        'Wrzesień',
        'Październik',
        'Listopad',
        'Grudzień',
    ]
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
}

function formatAmount(amount: number, currency: string) {
    return amount.toLocaleString('pl-PL') + ' ' + currency
}
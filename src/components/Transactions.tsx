import { Transaction } from '@/src/data/transactions'
import {Pressable, Text, View} from 'react-native'
import { useStateContext } from '@/src/contexts/StateContext';
import {users} from "@/src/data/users";
import {CreatePayment} from "@/src/services/CreatePayment";

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
        state: { currentUserId },
    } = useStateContext()

    const displayed = transactions.slice(0, maxElements)

    if (displayed.length === 0) {
        return (
            <View className="py-4">
                <Text className="text-gray-500">Brak transakcji do wyświetlenia.</Text>
            </View>
        )
    }

    return (
        <View className="bg-white rounded-xl overflow-hidden shadow-sm">

            <View className="flex-row bg-gray-100 px-4 py-3 border-b border-gray-200">
                <Text className="flex-[1.6] font-semibold text-sm">Opis</Text>
                <Text className="flex-[1.2] font-semibold text-sm">ID</Text>
                <Text className="flex-1 font-semibold text-sm">Status</Text>
                <Text className="flex-1 font-semibold text-sm">Data</Text>
                <Text className="flex-1 font-semibold text-sm text-right">Kwota</Text>
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
                            <Text className="flex-1 text-sm">{formatDate(tx.dateIssued)}</Text>
                            <Text className="flex-1 text-sm font-semibold text-right">
                                {formatAmount(tx.amount, tx.currency)}
                            </Text>
                        </View>
                    </View>
                </Pressable>
            ))}
        </View>

    )
}

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
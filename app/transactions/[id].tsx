// src/app/transactions/[id].tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useStateContext } from '@/src/contexts/StateContext';
import { translation } from '@/src/translation';

export default function TransactionScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { state: { transactions }, updateTransactionStatus, langId } = useStateContext();
    const tx = transactions.find(t => t.id === id);

    if (!tx) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text>{translation[langId].transactions.notFound || 'Nie znaleziono transakcji'}</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white p-4 pt-[60px] px-4 space-y-6">
            <Text className="text-xl font-bold mb-4">
                {translation[langId].transactions.detailsHeader}
            </Text>

            <Text className="mb-2">
                {translation[langId].transactions.dateIssued}: {new Date(tx.dateIssued).toLocaleDateString()}
            </Text>
            <Text className="mb-2">
                {translation[langId].transactions.dueDate}: {new Date(tx.dueDate).toLocaleDateString()}
            </Text>
            <Text className="mb-2">
                {translation[langId].transactions.amount}: {tx.amount} {tx.currency}
            </Text>
            <Text className="mb-4">
                {translation[langId].transactions.description}: {tx.description}
            </Text>

            <View className="mt-6 flex-row justify-between">
                <Button
                    title={translation[langId].transactions.payButton}
                    onPress={() => {
                        updateTransactionStatus(tx.id, 'paid');
                        router.back();
                    }}
                />
                <Button
                    title={translation[langId].transactions.cancelButton}
                    onPress={() => {
                        updateTransactionStatus(tx.id, 'cancelled');
                        router.back();
                    }}
                />
            </View>
        </View>
    );
}

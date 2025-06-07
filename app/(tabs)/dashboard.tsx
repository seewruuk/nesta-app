// src/screens/Dashboard.tsx

import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useStateContext } from '@/src/contexts/StateContext';
import OfferCard from '@/src/components/OfferCard';
import Transactions from '@/src/components/Transactions';
import Messages from '@/src/components/Messages';
import { Transaction } from '@/src/types/Transaction';

const FAKE_TRANSACTIONS: Transaction[] = [
    {
        id: '12548796',
        description: 'Czynsz za styczeń',
        date: '2025-01-23T10:15:00Z',
        amount: 3500,
        currency: 'PLN',
        status: 'Zaksięgowano',
    },
    {
        id: '12548797',
        description: 'Rachunek za prąd',
        date: '2025-02-10T08:30:00Z',
        amount: 250,
        currency: 'PLN',
        status: 'Oczekuje na płatność',
    },
    {
        id: '12548798',
        description: 'Naprawa drzwi balkonowych',
        date: '2025-02-05T14:45:00Z',
        amount: 400,
        currency: 'PLN',
        status: 'Zaksięgowano',
    },
    {
        id: '12548799',
        description: 'Rachunek za internet',
        date: '2025-02-05T16:00:00Z',
        amount: 100,
        currency: 'PLN',
        status: 'W trakcie',
    },
];

export default function Dashboard() {
    const {
        state: { offers },
    } = useStateContext();

    // Pokaż tylko opublikowane oferty
    const publishedOffers = offers.filter(o => o.status === 'Opublikowany');

    return (
        <ScrollView className="flex-1 bg-white p-4 space-y-6">
            {/* Twoje oferty */}
            <View>
                <Text className="text-xl font-bold mb-2">Twoje oferty</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="space-x-4"
                >
                    {publishedOffers.map(offer => (
                        <OfferCard key={offer.id} offer={offer} />
                    ))}
                </ScrollView>
            </View>

            {/* Transakcje */}
            <View>
                <Text className="text-xl font-bold mb-2">Transakcje</Text>
                <Transactions transactions={FAKE_TRANSACTIONS} maxElements={5} />
            </View>

            {/* Wiadomości */}
            <View>
                <Text className="text-xl font-bold mb-2">Wiadomości</Text>
                <Messages messages={[]} maxElements={2} />
            </View>
        </ScrollView>
    );
}

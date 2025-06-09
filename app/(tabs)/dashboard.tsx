// app/(tabs)/dashboard.tsx

import React, { useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
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
    const router = useRouter();
    const {
        state: { currentUserId, offers },
    } = useStateContext();

    // If not logged in, redirect to /login
    useEffect(() => {
        if (!currentUserId) {
            router.replace('/login');
        }
    }, [currentUserId]);

    // While redirecting, render nothing
    if (!currentUserId) {
        return null;
    }

    // Show only offers posted by current user
    const myOffers = offers.filter(o => o.authorId === currentUserId);

    return (
        <ScrollView className="flex-1 bg-white p-4 space-y-6">
            {/* Twoje oferty */}
            <View>
                <Text className="text-xl font-bold mb-2">Twoje oferty</Text>
                {myOffers.length === 0 ? (
                    <Text className="text-gray-600">Nie masz jeszcze żadnych ofert.</Text>
                ) : (
                    myOffers.map(offer => (
                        <OfferCard key={offer.id} offer={offer} />
                    ))
                )}
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

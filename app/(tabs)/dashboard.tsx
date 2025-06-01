import React, { useState } from 'react'
import { ScrollView, View, Text } from 'react-native'
import ApartmentCard from '@/src/components/ApartmentCard'
import Transactions from '@/src/components/Transactions'
import Messages from '@/src/components/Messages'
import { Apartment } from '@/src/types'
import {Transaction} from "@/src/types/Transaction";

const FAKE_APARTMENTS: Apartment[] = [
    {
        id: '1',
        title: 'Przytulne mieszkanie w centrum',
        description: 'Przestronne i jasne mieszkanie blisko metra.',
        price: 120,
        city: 'Warszawa',
        area: 45,
        furnished: true,
        type: 'mieszkanie',
        images: [{ uri: 'https://via.placeholder.com/400x300' }],
        rating: 4.5,
    },
    {
        id: '2',
        title: 'Nowoczesne studio',
        description: 'Nowoczesne studio z wydzielonym miejscem do pracy.',
        price: 90,
        city: 'Kraków',
        area: 30,
        furnished: false,
        type: 'studio',
        images: [{ uri: 'https://via.placeholder.com/400x300' }],
        rating: 3.8,
    },
    {
        id: '3',
        title: 'Dom rodzinny z ogrodem',
        description: 'Duży dom z ogrodem idealny dla rodziny.',
        price: 350,
        city: 'Gdańsk',
        area: 120,
        furnished: true,
        type: 'dom',
        images: [{ uri: 'https://via.placeholder.com/400x300' }],
        rating: 4.7,
    },
]

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
]

export default function Dashboard() {
    // Używamy sztucznej bazy
    const [apartments] = useState<Apartment[]>(FAKE_APARTMENTS)
    const [transactions] = useState<Transaction[]>(FAKE_TRANSACTIONS)
    const [messages] = useState<any[]>([])

    // Filtrujemy polubione oferty (rating >= 4)
    const liked = apartments.filter((item) => item.rating >= 4)

    return (
        <ScrollView className="flex-1 bg-white p-4 space-y-6">
            {/* Twoje oferty */}
            <View>
                <Text className="text-xl font-bold mb-2">Twoje oferty</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-4">
                    {liked.map((apt) => (
                        <ApartmentCard key={apt.id} apartment={apt} />
                    ))}
                </ScrollView>
            </View>

            {/* Transakcje */}
            <View>
                <Text className="text-xl font-bold mb-2">Transakcje</Text>
                <Transactions transactions={transactions} maxElements={5} />
            </View>

            {/* Wiadomości */}
            <View>
                <Text className="text-xl font-bold mb-2">Wiadomości</Text>
                <Messages messages={messages} maxElements={2} />
            </View>
        </ScrollView>
    )
}

// src/components/OfferCard.tsx

import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useStateContext } from '@/src/contexts/StateContext';
import { Offer } from '@/src/data/offers';
import Header from './Header';
import { useRouter } from 'expo-router';
import { UserCircle } from 'lucide-react-native'; // ikona domyślna

interface OfferCardProps {
    offer: Offer;
}

export default function OfferCard({ offer }: OfferCardProps) {
    const {
        state: { apartments, users }
    } = useStateContext();

    const apartment = apartments.find(a => a.id === offer.apartmentId);
    const author    = users.find(u => u.id === offer.authorId);
    const router    = useRouter();

    return (
        <View className="bg-white p-4 rounded-xl shadow-md mb-4">
            {/* Obraz mieszkania */}
            <Pressable
                onPress={() => router.push(`/offers/${offer.id}`)}
                className="h-[200px] w-full rounded-xl overflow-hidden mb-4"
            >
                {apartment?.images[0] && (
                    <Image
                        source={{ uri: apartment.images[0] }}
                        className="object-cover w-full h-full"
                        resizeMode="cover"
                    />
                )}
            </Pressable>

            <View className="flex-row items-center mb-2">
                <Pressable
                    onPress={() => author && router.push(`/users/${author.slug}`)}
                    className="mr-3"
                >
                    {author?.avatar
                        ? <Image source={{ uri: author.avatar }} className="w-10 h-10 rounded-full" />
                        : <UserCircle size={32} color="#888" />
                    }
                </Pressable>
                {/* Imię autora */}
                <Text className="text-base font-medium">
                    {author?.fullName ?? 'Nieznany użytkownik'}
                </Text>
            </View>

            <View className="flex flex-col gap-2">
                {apartment && (
                    <Text className="text-[11px] text-gray-500">
                        {apartment.location.city}, {apartment.location.district}
                    </Text>
                )}
                <Header text={offer.title} className="text-[15px]" />
                <Text className="font-semibold">
                    {offer.rentPrice} PLN / msc
                </Text>
                <Text className="text-[12px] text-gray-600">
                    Dostępne od: {new Date(offer.availableFrom).toLocaleDateString('pl-PL')}
                </Text>
            </View>
        </View>
    );
}

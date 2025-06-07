// src/components/OfferCard.tsx
import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useStateContext } from '@/src/contexts/StateContext';
import { Offer } from '@/src/data/offers';
import Header from './Header';
import { useRouter } from 'expo-router';

interface OfferCardProps {
    offer: Offer;
}

export default function OfferCard({ offer }: OfferCardProps) {
    const { state: { apartments } } = useStateContext();
    const apartment = apartments.find(a => a.id === offer.apartmentId);
    const router = useRouter();

    return (
        <View className="bg-white p-4 rounded-xl shadow-md mb-4">
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

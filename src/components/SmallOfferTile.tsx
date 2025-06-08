// src/components/SmallOfferTile.tsx

import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useStateContext } from '@/src/contexts/StateContext';
import { Offer } from '@/src/data/offers';
import { useRouter } from 'expo-router';

interface SmallOfferTileProps {
    offer: Offer;
}

export default function SmallOfferTile({ offer }: SmallOfferTileProps) {
    const { state: { apartments } } = useStateContext();
    const apartment = apartments.find(a => a.id === offer.apartmentId);
    const router = useRouter();

    return (
        <Pressable
            onPress={() => router.push(`/offers/${offer.id}`)}
            className="bg-white rounded-lg shadow-md overflow-hidden"
        >
            {/* Thumbnail image */}
            {apartment?.images[0] ? (
                <Image
                    source={{ uri: apartment.images[0] }}
                    className="w-full h-32"
                    resizeMode="cover"
                />
            ) : (
                <View className="w-full h-24 bg-gray-200" />
            )}

            {/* Content */}
            <View className="p-2">
                <Text className="text-sm font-semibold number-of-lines-2">
                    {offer.title}
                </Text>
                <Text className="text-xs text-gray-600 mt-1">
                    {offer.rentPrice} PLN
                </Text>
                {apartment && (
                    <Text className="text-xs text-gray-500">
                        {apartment.location.city}
                    </Text>
                )}
            </View>
        </Pressable>
    );
}

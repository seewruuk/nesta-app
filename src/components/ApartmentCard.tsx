import React from 'react'
import { View, Text, Image, Pressable } from 'react-native'
import { Apartment } from '@/src/types'
import { useRouter } from 'expo-router'

export const ApartmentCard: React.FC<{ apt: Apartment }> = ({ apt }) => {
    const router = useRouter()
    return (
        <Pressable
            onPress={() => router.push(`/offers/${apt.id}`)}
            className="bg-white rounded-lg overflow-hidden mb-4"
        >
            <Image
                source={apt.images[0]}
                className="w-full h-40"
                resizeMode="cover"
            />
            <View className="p-4 space-y-1">
                <Text className="text-lg font-semibold">{apt.title}</Text>
                <Text className="text-sm text-gray-500">{apt.city} • {apt.area} m²</Text>
                <Text className="text-sm text-gray-500">
                    {apt.furnished ? 'Umeblowane' : 'Bez mebli'} • {apt.type}
                </Text>
                <Text className="text-base font-medium">{apt.pricePerNight} PLN / noc</Text>
            </View>
        </Pressable>
    )
}
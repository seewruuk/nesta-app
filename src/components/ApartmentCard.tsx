import React from 'react'
import {View, Text, Image, Pressable} from 'react-native'
import {Apartment} from '@/src/types'
import Button from "./Button"
import Header from "./Header"
import {useRouter} from "expo-router";

interface ApartmentCardProps {
    apartment: Apartment
}

export default function ApartmentCard({apartment}: ApartmentCardProps) {

    const router = useRouter();

    return (
        <View className="bg-white p-4 rounded-xl shadow-md mb-4">
            <Pressable
                onPress={() => router.push(`/offers/${apartment.id}`)}
                className="h-[200px] w-full rounded-xl overflow-hidden mb-4 "
            >
                <Image
                    source={apartment.images[0]}
                    className="object-cover w-full"
                    resizeMode="cover"
                />
            </Pressable>

            <View className={"flex flex-col gap-3"}>
                <Text className={"text-[11px] text-gray-500"}>{apartment.city}</Text>
                <Header text={apartment.title} className={"text-[15px]"}/>
                <Text>{apartment.price}PLN / msc.</Text>
                <View>
                    <View className={"flex flex-row gap-2"}>
                        <Text className={"text-[#C5C5C5] text-[11px]"}>Powierzchnia</Text>
                        <Text className={"text-[#C5C5C5] text-[11px]"}>{apartment.area} m2</Text>
                    </View>
                </View>

                <View className={"flex flex-row gap-4 justify-between items-center"}>

                    <Pressable
                        onPress={() => router.push(`/offers/${apartment.id}`)}
                        className="bg-primary py-4 flex-1  rounded-xl"
                    >
                      <Text className={"text-center"}>Zobacz więcej</Text>
                    </Pressable>

                    <Pressable
                        onPress={() => router.push(`/`)}
                        className="bg-black py-4 flex-1 rounded-xl"
                    >
                        <Text className={"text-white text-center"}>Kontakt</Text>
                    </Pressable>
                </View>
            </View>
        </View>

    )
}

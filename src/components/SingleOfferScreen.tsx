// components/SingleOfferScreen.tsx
import React from "react";
import {View, Text, Image, ScrollView, Pressable} from "react-native";
import {useApartments} from "@/src/contexts/ApartmentsContext";
import Layout from "./Layout";
import Paragraph from "@/src/components/Paragraph";

interface SingleOfferScreenProps {
    id: string;
}

export default function SingleOfferScreen({id}: SingleOfferScreenProps) {
    const {list: apartments} = useApartments();
    const apartment = apartments.find((apt) => apt.id === id);

    if (!apartment) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text>Apartament nie znaleziony</Text>
            </View>
        );
    }

    return (
        <Layout>
            <ScrollView className="flex-1  p-4 gap-5">
                <Image
                    source={apartment.images[0]}
                    className="w-full h-64 rounded-lg mb-4"
                    resizeMode="cover"
                />
                <Text className="text-2xl font-bold mb-2">{apartment.title}</Text>
                <Text className="text-gray-600 mb-4">{apartment.city}</Text>

                <View className={"flex flex-row gap-4 justify-between items-center"}>

                    <Pressable
                        onPress={() => console.log("Zobacz więcej")}
                        className="bg-primary py-4 flex-1  rounded-xl"
                    >
                        <Text className={"text-center"}>Zobacz więcej</Text>
                    </Pressable>

                    <Pressable
                        onPress={() => console.log("Dodaj do ulubionych")}
                        className="bg-black py-4 flex-1 rounded-xl"
                    >
                        <Text className={"text-white text-center"}>Kontakt</Text>
                    </Pressable>
                </View>

                <View className={"mt-4"}>
                    <Paragraph text={apartment.description}/>
                </View>

                {/* Tutaj dodasz resztę szczegółów apartamentu */}
            </ScrollView>
        </Layout>
    );
}

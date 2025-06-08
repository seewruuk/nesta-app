// src/screens/UserDetails.tsx

import React from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    Pressable,
    FlatList,
    Linking
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useStateContext } from '@/src/contexts/StateContext';
import OfferCard from '@/src/components/OfferCard';
import { User, Review } from '@/src/data/users';
import SmallOfferTile from "@/src/components/SmallOfferTile";

export default function UserDetails() {
    const { slug } = useLocalSearchParams();
    const {
        state: { users, offers }
    } = useStateContext();

    const user: User | undefined = users.find(u => u.slug === slug);
    if (!user) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text>Użytkownik nie znaleziony</Text>
            </View>
        );
    }

    const userOffers = offers.filter(o => o.authorId === user.id);

    const openContact = () => {
        // placeholder: open contact modal or mailto
        Linking.openURL(`mailto:kontakt@przyklad.pl`);
    };

    return (
        <ScrollView className="flex-1 bg-white">
            {/* Banner */}
            {user.coverImage ? (
                <Image
                    source={{ uri: user.coverImage }}
                    className="w-full h-48"
                    resizeMode="cover"
                />
            ) : (
                <View className="w-full h-48 bg-gray-200" />
            )}

            <View className="px-4 pt-4 items-center">
                {user.avatar ? (
                    <Image
                        source={{ uri: user.avatar }}
                        className="w-24 h-24 rounded-full -mt-12 border-4 border-white"
                    />
                ) : (
                    <View className="w-24 h-24 bg-gray-300 rounded-full -mt-12 border-4 border-white" />
                )}

                <Text className="text-2xl font-bold mt-2">{user.fullName}</Text>
                <Text className="text-gray-600 text-center mt-1">{user.bio}</Text>

                <View className="flex-row items-center mt-2">
                    <Text className="font-semibold mr-2">
                        Ocena: {user.rating.toFixed(1)} / 5.0
                    </Text>
                    <Pressable onPress={() => {/* show reviews modal */}}>
                        <Text className="text-blue-500">Zobacz</Text>
                    </Pressable>
                </View>
            </View>

            <View className="px-4 mt-6">
                <Text className="text-xl font-bold mb-3">Aktualne oferty</Text>
                {userOffers.length === 0 ? (
                    <Text>Brak aktywnych ofert.</Text>
                ) : (
                    <FlatList
                        data={userOffers}
                        horizontal
                        keyExtractor={o => o.id}
                        renderItem={({ item }) => (
                            <View className="mr-4 w-64">
                                <SmallOfferTile offer={item} />


                                {/*<View className="flex-row justify-between mt-2">*/}
                                {/*    <Pressable*/}
                                {/*        onPress={() => useRouter().push(`/offers/${item.id}`)}*/}
                                {/*        className="bg-primary px-3 py-2 rounded"*/}
                                {/*    >*/}
                                {/*        <Text className="text-white">Zobacz więcej</Text>*/}
                                {/*    </Pressable>*/}
                                {/*    <Pressable*/}
                                {/*        onPress={openContact}*/}
                                {/*        className="bg-secondary px-3 py-2 rounded"*/}
                                {/*    >*/}
                                {/*        <Text className="text-white">Kontakt</Text>*/}
                                {/*    </Pressable>*/}
                                {/*</View>*/}



                            </View>
                        )}
                        showsHorizontalScrollIndicator={false}
                    />
                )}
            </View>

            {/* Reviews */}
            <View className="px-4 mt-6 mb-8">
                <Text className="text-xl font-bold mb-3">Opinie</Text>
                {user.reviews.map((rev: Review) => (
                    <View key={rev.id} className="mb-4 p-4 bg-gray-100 rounded">
                        <Text className="font-semibold mb-1">{rev.author}</Text>
                        <Text className="text-gray-700 mb-2">{rev.text}</Text>
                        <Text className="text-gray-600">Ocena: {rev.rating} / 5.0</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

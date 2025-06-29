/**
 * WelcomeModal component.
 *
 * Displays an animated sliding background image with an overlaid search form.
 * Users can enter a city and optional minimum/maximum price, then press "Search"
 * to navigate to the offers list with those query parameters.
 *
 * Background image continuously slides horizontally in a loop for a dynamic effect.
 *
 * @component
 */
import { images } from "@/src/constants/images"
import { useRouter } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import { Animated, Dimensions, ImageBackground, Pressable, Text, TextInput, View } from 'react-native'
import Button from './Button'
import Header from "./Header"
import Paragraph from './Paragraph'
import {translation} from "@/src/translation";
import {useStateContext} from "@/src/contexts/StateContext";

const windowWidth = Dimensions.get('window').width

export const WelcomeModal: React.FC = () => {
    const { langId } = useStateContext();

    const router = useRouter()
    const [city, setCity] = useState('')
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const translateX = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(translateX, {
                    toValue: 10,
                    duration: 3000,
                    useNativeDriver: true,
                }),
                Animated.timing(translateX, {
                    toValue: -10,
                    duration: 3000,
                    useNativeDriver: true,
                }),
            ])
        ).start()
    }, [translateX])



    /**
     * Handle the search action.
     * Constructs URL query parameters from city, minPrice, and maxPrice,
     * then navigates to the offers screen with those parameters.
     */

    const handleSearch = () => {
        const params = new URLSearchParams({
            city,
            minPrice,
            maxPrice,
        }).toString();
        router.push(`/offers?${params}`);
    };

    return (
        <View className="flex-1 justify-center items-center relative">

            {/* Tło - obraz z animacją */}
            <Animated.View
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: windowWidth,
                    height: '100%',
                    transform: [{ translateX }],
                    zIndex: -2,
                }}
            >
                <ImageBackground
                    source={images.bg}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover"
                />
            </Animated.View>


            <View
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: windowWidth,
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.96)',
                    zIndex: -1,
                }}
            />

            <View className="w-10/12 bg-white rounded-3xl p-[32px] space-y-4 flex flex-col gap-8 z-10">

                <View>
                    <Header text={"Witaj ponownie!"} className={"py-4 text-3xl"} />
                    <Paragraph
                        className={""}
                        text={translation[langId].home.title} />
                </View>

                <View className="flex flex-col">
                    <View className="flex flex-row justify-between">
                        <Pressable
                            onPress={() => console.log("click")}
                            className={"border-t border-r border-l border-gray-300 flex-1 rounded-tr-2xl rounded-tl-2xl flex items-center justify-center py-4 font-semibold"}
                        ><Text>Wynajem</Text></Pressable>
                        <Pressable
                            onPress={() => router.push("/posts")}
                            className={"border border-gray-300 bg-[#F5F5F5] flex-1 -ml-4 rounded-tr-2xl flex items-center justify-center py-4 "}
                        ><Text>Znd. Współlokatora</Text></Pressable>
                    </View>

                    <View className="flex gap-2 px-4 border-b border-r border-l border-gray-300 rounded-br-2xl rounded-bl-2xl z-50 bg-white py-5">
                        <TextInput
                            value={city}
                            onChangeText={setCity}
                            placeholder="Miasto"
                            className="bg-gray-100 rounded-lg px-3 py-3"
                        />
                        <View className="flex flex-row gap-2">
                            <TextInput
                                value={minPrice}
                                onChangeText={setMinPrice}
                                placeholder="Min. cena"
                                className="bg-gray-100 rounded-lg px-3 py-3 flex-1"
                                keyboardType="numeric"
                            />
                            <TextInput
                                value={maxPrice}
                                onChangeText={setMaxPrice}
                                placeholder="Max. cena"
                                className="bg-gray-100 rounded-lg px-3 py-3 flex-1"
                                keyboardType="numeric"
                            />
                        </View>
                        <Button text={"Szukaj"} onPress={handleSearch} />
                    </View>

                </View>

            </View>

        </View>
    )
}

// src/components/FilterPanel.tsx

import React, { useEffect, useRef } from 'react';
import {
    View, Text, TextInput, Pressable, Animated,
    TouchableWithoutFeedback
} from 'react-native';

export interface Filters {
    city: string;
    priceMin: string;
    priceMax: string;
    roomsMin: string;
    roomsMax: string;
    bedroomsMin: string;
    bedroomsMax: string;
    furnished: string;          // 'Tak' | 'Nie' | 'Częściowo' | ''
    petsAllowed: string;        // 'Tak' | 'Nie' | 'Do ustalenia' | ''
    shortTermAllowed: string;   // 'Tak' | 'Nie' | ''
}

interface FilterPanelProps {
    visible: boolean;
    onClose: () => void;
    filters: Filters;
    setFilters: (f: Filters) => void;
}

export default function FilterPanel({
                                        visible, onClose, filters, setFilters
                                    }: FilterPanelProps) {
    const slideAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: visible ? 1 : 0,
            duration: 300,
            useNativeDriver: true
        }).start();
    }, [visible]);

    const translateX = slideAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [400, 0]
    });

    return (
        <>
            {visible && (
                <TouchableWithoutFeedback onPress={onClose}>
                    <View className="absolute inset-0 bg-black/80" />
                </TouchableWithoutFeedback>
            )}
            <Animated.View style={{
                transform: [{ translateX }],
                position: 'absolute', right: 0, top: 0, bottom: 0,
                width: '80%', backgroundColor: 'white', padding: 20, zIndex: 1000,
                paddingTop: 80
            }}>
                <Text className="text-lg font-bold mb-4">Filtruj oferty</Text>

                {/* Miasto */}
                <Text className="font-semibold">Miasto</Text>
                <TextInput
                    className="border border-gray-400 rounded p-2 mb-4"
                    placeholder="np. Warszawa"
                    value={filters.city}
                    onChangeText={city => setFilters({ ...filters, city })}
                />

                {/* Cena */}
                <Text className="font-semibold">Cena min (PLN)</Text>
                <TextInput
                    keyboardType="numeric"
                    className="border border-gray-400 rounded p-2 mb-4"
                    placeholder="np. 1000"
                    value={filters.priceMin}
                    onChangeText={priceMin => setFilters({ ...filters, priceMin })}
                />
                <Text className="font-semibold">Cena max (PLN)</Text>
                <TextInput
                    keyboardType="numeric"
                    className="border border-gray-400 rounded p-2 mb-4"
                    placeholder="np. 5000"
                    value={filters.priceMax}
                    onChangeText={priceMax => setFilters({ ...filters, priceMax })}
                />

                {/* Liczba pokoi */}
                <Text className="font-semibold">Min. pokoi</Text>
                <TextInput
                    keyboardType="numeric"
                    className="border border-gray-400 rounded p-2 mb-4"
                    placeholder="np. 1"
                    value={filters.roomsMin}
                    onChangeText={roomsMin => setFilters({ ...filters, roomsMin })}
                />
                <Text className="font-semibold">Max. pokoi</Text>
                <TextInput
                    keyboardType="numeric"
                    className="border border-gray-400 rounded p-2 mb-4"
                    placeholder="np. 4"
                    value={filters.roomsMax}
                    onChangeText={roomsMax => setFilters({ ...filters, roomsMax })}
                />

                {/* Liczba sypialni */}
                <Text className="font-semibold">Min. sypialni</Text>
                <TextInput
                    keyboardType="numeric"
                    className="border border-gray-400 rounded p-2 mb-4"
                    placeholder="np. 1"
                    value={filters.bedroomsMin}
                    onChangeText={bedroomsMin => setFilters({ ...filters, bedroomsMin })}
                />
                <Text className="font-semibold">Max. sypialni</Text>
                <TextInput
                    keyboardType="numeric"
                    className="border border-gray-400 rounded p-2 mb-4"
                    placeholder="np. 3"
                    value={filters.bedroomsMax}
                    onChangeText={bedroomsMax => setFilters({ ...filters, bedroomsMax })}
                />

                {/* Umeblowane */}
                <Text className="font-semibold">Umeblowanie</Text>
                <TextInput
                    className="border border-gray-400 rounded p-2 mb-4"
                    placeholder="Tak / Nie / Częściowo"
                    value={filters.furnished}
                    onChangeText={furnished => setFilters({ ...filters, furnished })}
                />

                {/* Zwierzęta */}
                <Text className="font-semibold">Zwierzęta</Text>
                <TextInput
                    className="border border-gray-400 rounded p-2 mb-4"
                    placeholder="Tak / Nie / Do ustalenia"
                    value={filters.petsAllowed}
                    onChangeText={petsAllowed => setFilters({ ...filters, petsAllowed })}
                />

                {/* Wynajem krótkoterminowy */}
                <Text className="font-semibold">Krótki najem</Text>
                <TextInput
                    className="border border-gray-400 rounded p-2 mb-4"
                    placeholder="Tak / Nie"
                    value={filters.shortTermAllowed}
                    onChangeText={shortTermAllowed => setFilters({ ...filters, shortTermAllowed })}
                />

                <Pressable
                    onPress={onClose}
                    className="mt-4 bg-gray-200 rounded p-3 items-center"
                >
                    <Text>Zamknij</Text>
                </Pressable>
            </Animated.View>
        </>
    );
}

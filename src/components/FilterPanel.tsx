// components/FilterPanel.tsx
import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
    Animated,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";

interface FilterPanelProps {
    visible: boolean;
    onClose: () => void;
    filters: Filters;
    setFilters: (filters: Filters) => void;
}

export interface Filters {
    city: string;
    priceMin: string;
    priceMax: string;
    furnished: boolean | null; // null = wszystkie
    areaRange: "1" | "2" | "3" | "4" | ""; // "" = brak filtra
}

const areaRanges = [
    { label: "do 40", value: "1" },
    { label: "40-80", value: "2" },
    { label: "80-120", value: "3" },
    { label: "powyżej 120", value: "4" },
];

export default function FilterPanel({
                                        visible,
                                        onClose,
                                        filters,
                                        setFilters,
                                    }: FilterPanelProps) {
    const slideAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: visible ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [visible]);

    const panelTranslateX = slideAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [400, 0], // dostosuj szerokość wysuwania
    });

    return (
        <>
            {visible && (
                <TouchableWithoutFeedback onPress={onClose}>
                    <View className="absolute inset-0" style={{backgroundColor: "rgba(0,0,0,0.92)"}} />
                </TouchableWithoutFeedback>
            )}

            <Animated.View
                style={{
                    transform: [{ translateX: panelTranslateX }],
                    position: "absolute",
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: "80%",
                    backgroundColor: "white",
                    padding: 20,
                    zIndex: 1000,
                    paddingTop: 80,
                }}
            >
                <Text className="text-lg font-bold mb-4">Filtruj apartamenty</Text>

                <Text className="font-semibold">Miasto</Text>
                <TextInput
                    className="border border-gray-400 rounded p-2 mb-4"
                    placeholder="np. Warszawa"
                    value={filters.city}
                    onChangeText={(text) => setFilters({ ...filters, city: text })}
                />

                <Text className="font-semibold">Cena minimalna (PLN)</Text>
                <TextInput
                    keyboardType="numeric"
                    className="border border-gray-400 rounded p-2 mb-4"
                    placeholder="np. 1000"
                    value={filters.priceMin}
                    onChangeText={(text) => setFilters({ ...filters, priceMin: text })}
                />

                <Text className="font-semibold">Cena maksymalna (PLN)</Text>
                <TextInput
                    keyboardType="numeric"
                    className="border border-gray-400 rounded p-2 mb-4"
                    placeholder="np. 5000"
                    value={filters.priceMax}
                    onChangeText={(text) => setFilters({ ...filters, priceMax: text })}
                />

                <Text className="font-semibold mb-2">Umeblowane</Text>
                <View className="flex flex-row items-center mb-4 space-x-4">
                    <Pressable
                        onPress={() => setFilters({ ...filters, furnished: null })}
                        className={`px-3 py-1 rounded ${
                            filters.furnished === null
                                ? "bg-primary text-white"
                                : "bg-gray-200"
                        }`}
                    >
                        <Text>Wszystkie</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => setFilters({ ...filters, furnished: true })}
                        className={`px-3 py-1 rounded ${
                            filters.furnished === true
                                ? "bg-primary text-white"
                                : "bg-gray-200"
                        }`}
                    >
                        <Text>Tak</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => setFilters({ ...filters, furnished: false })}
                        className={`px-3 py-1 rounded ${
                            filters.furnished === false
                                ? "bg-primary text-white"
                                : "bg-gray-200"
                        }`}
                    >
                        <Text>Nie</Text>
                    </Pressable>
                </View>

                <Text className="font-semibold mb-2">Powierzchnia (m²)</Text>
                <View className="flex flex-row flex-wrap gap-2">
                    {areaRanges.map(({ label, value }) => (
                        <Pressable
                            key={value}
                            onPress={() => setFilters({ ...filters, areaRange: value })}
                            className={`px-3 py-1 rounded border ${
                                filters.areaRange === value
                                    ? "bg-primary border-green-600 text-white"
                                    : "border-gray-300 bg-gray-100"
                            }`}
                        >
                            <Text>{label}</Text>
                        </Pressable>
                    ))}
                    <Pressable
                        onPress={() => setFilters({ ...filters, areaRange: "" })}
                        className={`px-3 py-1 rounded border ${
                            filters.areaRange === ""
                                ? "bg-primary border-green-600 text-white"
                                : "border-gray-300 bg-gray-100"
                        }`}
                    >
                        <Text>Wszystkie</Text>
                    </Pressable>
                </View>
            </Animated.View>
        </>
    );
}

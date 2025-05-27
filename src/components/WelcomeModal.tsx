// src/components/WelcomeModal.tsx
import React, { useState } from 'react'
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'

const FLAT_TYPES = [
    { label: 'Kawalerka', value: 'studio' },
    { label: '2 pokoje', value: '2' },
    { label: '3+ pokoje', value: '3+' },
]

export const WelcomeModal: React.FC = () => {
    const router = useRouter()
    const [mode, setMode] = useState<'flatmate' | 'rent'>('rent')
    const [city, setCity] = useState('')
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const [type, setType] = useState('')
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const onSearch = () => {
        if (mode === 'flatmate') {
            router.push('/posts')
        } else {
            const params = new URLSearchParams({ city, minPrice, maxPrice, type })
            router.push(`/offers?${params.toString()}`)
        }
    }

    const selectedTypeLabel = FLAT_TYPES.find(t => t.value === type)?.label

    return (
        <View className="absolute inset-0 justify-center items-center bg-black bg-opacity-50">
            <View className="w-10/12 bg-white rounded-lg p-6 space-y-4">
                {/* Segmentacja */}
                <View className="flex-row justify-around">
                    <Pressable onPress={() => setMode('flatmate')}>
                        <Text className={`text-lg ${mode === 'flatmate' ? 'font-bold text-black' : 'text-gray-500'}`}>
                            Znajdź współlokatora
                        </Text>
                    </Pressable>
                    <Pressable onPress={() => setMode('rent')}>
                        <Text className={`text-lg ${mode === 'rent' ? 'font-bold text-black' : 'text-gray-500'}`}>
                            Wynajem
                        </Text>
                    </Pressable>
                </View>

                {/* Miasto */}
                <TextInput
                    value={city}
                    onChangeText={setCity}
                    placeholder="Miasto"
                    className="border border-gray-300 rounded px-3 py-2"
                />

                {/* Tylko dla Wynajem */}
                {mode === 'rent' && (
                    <>
                        {/* Zakres ceny */}
                        <View className="flex-row space-x-2">
                            <TextInput
                                value={minPrice}
                                onChangeText={setMinPrice}
                                placeholder="Min cena"
                                keyboardType="numeric"
                                className="flex-1 border border-gray-300 rounded px-3 py-2"
                            />
                            <TextInput
                                value={maxPrice}
                                onChangeText={setMaxPrice}
                                placeholder="Max cena"
                                keyboardType="numeric"
                                className="flex-1 border border-gray-300 rounded px-3 py-2"
                            />
                        </View>

                        {/* Custom Dropdown */}
                        <View className="relative">
                            <Pressable
                                className="border border-gray-300 rounded px-3 py-2 flex-row justify-between items-center"
                                onPress={() => setDropdownOpen(prev => !prev)}
                            >
                                <Text className={`${selectedTypeLabel ? 'text-black' : 'text-gray-400'}`}>
                                    {selectedTypeLabel || 'Typ mieszkania'}
                                </Text>
                                <Text className="text-gray-500">{dropdownOpen ? '▲' : '▼'}</Text>
                            </Pressable>
                            {dropdownOpen && (
                                <ScrollView
                                    className="absolute top-full mt-1 w-full max-h-40 bg-white border border-gray-300 rounded"
                                >
                                    {FLAT_TYPES.map(option => (
                                        <Pressable
                                            key={option.value}
                                            onPress={() => {
                                                setType(option.value)
                                                setDropdownOpen(false)
                                            }}
                                            className="px-3 py-2"
                                        >
                                            <Text className="text-black">{option.label}</Text>
                                        </Pressable>
                                    ))}
                                </ScrollView>
                            )}
                        </View>
                    </>
                )}

                {/* Przycisk Szukaj */}
                <Pressable
                    onPress={onSearch}
                    className="bg-primary rounded-lg py-3 items-center mt-2"
                >
                    <Text className="text-black text-lg font-medium">Szukaj</Text>
                </Pressable>
            </View>
        </View>
    )
}

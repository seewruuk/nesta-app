import React, { useState, useMemo } from 'react'
import { View, TextInput, Text, Pressable, ScrollView, FlatList } from 'react-native'
import { useApartments } from '@/src/contexts/ApartmentsContext'
import { ApartmentCard } from '@/src/components/ApartmentCard'

const AREA_FILTERS = [
    { label: 'do 40', predicate: (a: number) => a <= 40 },
    { label: '40-80', predicate: (a: number) => a > 40 && a <= 80 },
    { label: '80-120', predicate: (a: number) => a > 80 && a <= 120 },
    { label: 'powyżej 120', predicate: (a: number) => a > 120 },
]

export default function OffersScreen() {
    const { list } = useApartments()
    const [cityFilter, setCityFilter] = useState('')
    const [areaFilter, setAreaFilter] = useState<typeof AREA_FILTERS[0] | null>(null)
    const [furnishedFilter, setFurnishedFilter] = useState<boolean | null>(null)
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const [typeFilter, setTypeFilter] = useState<string>('')

    const filtered = useMemo(() => {
        return list.filter(apt => {
            if (cityFilter && !apt.city.toLowerCase().includes(cityFilter.toLowerCase())) return false
            if (areaFilter && !areaFilter.predicate(apt.area)) return false
            if (furnishedFilter !== null && apt.furnished !== furnishedFilter) return false
            if (minPrice && apt.pricePerNight < Number(minPrice)) return false
            if (maxPrice && apt.pricePerNight > Number(maxPrice)) return false
            if (typeFilter && apt.type !== typeFilter) return false
            return true
        })
    }, [list, cityFilter, areaFilter, furnishedFilter, minPrice, maxPrice, typeFilter])

    return (
        <View className="flex-1 bg-gray-100 p-4">
            <ScrollView horizontal className="mb-4" showsHorizontalScrollIndicator={false}>
                {/* City */}
                <TextInput
                    value={cityFilter}
                    onChangeText={setCityFilter}
                    placeholder="Miasto"
                    className="border border-gray-300 rounded px-3 py-2 mr-2 w-40"
                />
                {/* Area */}
                <ScrollView horizontal>
                    {AREA_FILTERS.map(opt => (
                        <Pressable
                            key={opt.label}
                            onPress={() => setAreaFilter(opt === areaFilter ? null : opt)}
                            className={`border px-3 py-2 mr-2 rounded ${areaFilter === opt ? 'bg-green-500 text-white' : 'bg-white'}`}
                        >
                            <Text className={`${areaFilter === opt ? 'text-white' : 'text-black'}`}>{opt.label}</Text>
                        </Pressable>
                    ))}
                </ScrollView>
                {/* Furnished */}
                <View className="flex-row mr-2">
                    {['Tak', 'Nie'].map(val => (
                        <Pressable
                            key={val}
                            onPress={() => setFurnishedFilter(val === 'Tak')}
                            className={`border px-3 py-2 mr-2 rounded ${
                                (furnishedFilter === (val === 'Tak')) ? 'bg-green-500' : 'bg-white'
                            }`}
                        >
                            <Text className={`${(furnishedFilter === (val === 'Tak')) ? 'text-white' : 'text-black'}`}>{val}</Text>
                        </Pressable>
                    ))}
                </View>
                {/* Cena */}
                <TextInput
                    value={minPrice}
                    onChangeText={setMinPrice}
                    placeholder="Min cena"
                    keyboardType="numeric"
                    className="border border-gray-300 rounded px-3 py-2 mr-2 w-32"
                />
                <TextInput
                    value={maxPrice}
                    onChangeText={setMaxPrice}
                    placeholder="Max cena"
                    keyboardType="numeric"
                    className="border border-gray-300 rounded px-3 py-2 w-32"
                />
                {/* Typ */}
                <TextInput
                    value={typeFilter}
                    onChangeText={setTypeFilter}
                    placeholder="Typ (mieszkanie, dom, studio)"
                    className="border border-gray-300 rounded px-3 py-2 w-40"
                />
            </ScrollView>

            <FlatList
                data={filtered}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <ApartmentCard apt={item} />}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

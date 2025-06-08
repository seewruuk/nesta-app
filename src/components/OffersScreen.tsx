// src/screens/OffersScreen.tsx

import React, { useState, useMemo } from 'react';
import { SafeAreaView, FlatList, Pressable, Text, View } from 'react-native';
import { useStateContext } from '@/src/contexts/StateContext';
import OfferCard from '../components/OfferCard';
import FilterPanel, { Filters } from '../components/FilterPanel';

export default function OffersScreen() {
    const { state: { offers, apartments } } = useStateContext();
    const [filters, setFilters] = useState<Filters>({
        city: '', priceMin: '', priceMax: '',
        roomsMin: '', roomsMax: '',
        bedroomsMin: '', bedroomsMax: '',
        furnished: '', petsAllowed: '', shortTermAllowed: ''
    });
    const [panelVisible, setPanelVisible] = useState(false);

    const filteredOffers = useMemo(() => {
        return offers.filter(o => {
            const a = apartments.find(x => x.id === o.apartmentId);
            if (!a) return false;

            // miasto
            if (filters.city &&
                !a.location.city.toLowerCase().includes(filters.city.toLowerCase()))
                return false;

            // cena
            if (filters.priceMin && o.rentPrice < +filters.priceMin) return false;
            if (filters.priceMax && o.rentPrice > +filters.priceMax) return false;

            // pokoje
            if (filters.roomsMin && a.roomsCount < +filters.roomsMin) return false;
            if (filters.roomsMax && a.roomsCount > +filters.roomsMax) return false;

            // sypialnie
            if (filters.bedroomsMin && a.bedroomsCount < +filters.bedroomsMin) return false;
            if (filters.bedroomsMax && a.bedroomsCount > +filters.bedroomsMax) return false;

            // umeblowanie
            if (filters.furnished && a.furnished !== filters.furnished) return false;

            // zwierzęta
            if (filters.petsAllowed && o.petsAllowed !== filters.petsAllowed) return false;

            // wynajem krótkoterminowy
            if (filters.shortTermAllowed) {
                const wantShort = filters.shortTermAllowed === 'Tak';
                if (o.shortTermAllowed !== wantShort) return false;
            }

            return true;
        });
    }, [offers, apartments, filters]);

    return (
        <SafeAreaView className="flex-1 bg-white relative pt-[40px]">
            <FlatList
                data={filteredOffers}
                keyExtractor={o => o.id}
                renderItem={({ item }) => <OfferCard offer={item} />}
                contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
            />

            <Pressable
                onPress={() => setPanelVisible(true)}
                className="absolute top-[80px] right-0 bg-primary rounded-full shadow-lg"
            >
                <Text className="text-black font-bold px-8 py-4">Filtry</Text>
            </Pressable>

            <FilterPanel
                visible={panelVisible}
                onClose={() => setPanelVisible(false)}
                filters={filters}
                setFilters={setFilters}
            />
        </SafeAreaView>
    );
}

import { useStateContext } from '@/src/contexts/StateContext';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import FilterPanel, { Filters } from '../components/FilterPanel';
import OfferCard from '../components/OfferCard';
import { useRouter } from 'expo-router';

export default function OffersScreen() {
    const { state: { offers, apartments } } = useStateContext();
    const router = useRouter();
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

            if (filters.city &&
                !a.location.city.toLowerCase().includes(filters.city.toLowerCase()))
                return false;

            if (filters.priceMin && o.rentPrice < +filters.priceMin) return false;
            if (filters.priceMax && o.rentPrice > +filters.priceMax) return false;

            if (filters.roomsMin && a.roomsCount < +filters.roomsMin) return false;
            if (filters.roomsMax && a.roomsCount > +filters.roomsMax) return false;

            if (filters.bedroomsMin && a.bedroomsCount < +filters.bedroomsMin) return false;
            if (filters.bedroomsMax && a.bedroomsCount > +filters.bedroomsMax) return false;
            if (filters.furnished && a.furnished !== filters.furnished) return false;

            if (filters.petsAllowed && o.petsAllowed !== filters.petsAllowed) return false;

            if (filters.shortTermAllowed) {
                const wantShort = filters.shortTermAllowed === 'Tak';
                if (o.shortTermAllowed !== wantShort) return false;
            }

            return true;
        });
    }, [offers, apartments, filters]);

    return (
        <SafeAreaView className="flex-1 bg-white relative pt-[40px]">
            <TouchableOpacity
                onPress={() => router.push('/create-offer')}
                style={{
                    backgroundColor: '#16a34a',
                    paddingVertical: 10,
                    paddingHorizontal: 16,
                    borderRadius: 8,
                    alignSelf: 'flex-start',
                    marginBottom: 10
                }}
            >
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>+</Text>
            </TouchableOpacity>
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

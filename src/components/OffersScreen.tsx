import React, { useState, useMemo } from "react";
import { SafeAreaView, FlatList, Pressable, Text } from "react-native";
import ApartmentCard from "./ApartmentCard";
import FilterPanel, { Filters } from "./FilterPanel";
import { useApartments } from "@/src/contexts/ApartmentsContext";
import { useRouter } from "expo-router";
import {useSearchParams} from "expo-router/build/hooks";

export default function OffersScreen() {
    const apartments = useApartments().list;
    const params = useSearchParams()
    const router = useRouter();

    // Funkcja do parsowania parametrów na początkowe filtry
    const parseFiltersFromParams = (): Filters => {
        const city = typeof params.city === "string" ? params.city : "";
        const priceMin = typeof params.minPrice === "string" ? params.minPrice : "";
        const priceMax = typeof params.maxPrice === "string" ? params.maxPrice : "";

        return {
            city,
            priceMin,
            priceMax,
            furnished: null,
            areaRange: "",
        };
    };

    // Inicjuj stan filtrów tylko raz z URL (przy remoncie komponentu)
    const [filters, setFilters] = useState<Filters>(parseFiltersFromParams());

    // Klucz wymuszający remount komponentu, jeśli zmieniają się parametry
    // Dzięki temu stan filtrów będzie zaktualizowany
    const key = JSON.stringify(params);

    const [filterVisible, setFilterVisible] = useState(false);

    const filteredApartments = useMemo(() => {
        return apartments.filter((apt) => {
            if (
                filters.city &&
                !apt.city.toLowerCase().includes(filters.city.toLowerCase())
            )
                return false;

            if (filters.priceMin) {
                const min = parseFloat(filters.priceMin);
                if (!isNaN(min) && apt.price < min) return false;
            }

            if (filters.priceMax) {
                const max = parseFloat(filters.priceMax);
                if (!isNaN(max) && apt.price > max) return false;
            }

            if (filters.furnished !== null && apt.furnished !== filters.furnished)
                return false;

            if (filters.areaRange) {
                switch (filters.areaRange) {
                    case "1":
                        if (apt.area > 40) return false;
                        break;
                    case "2":
                        if (apt.area < 40 || apt.area > 80) return false;
                        break;
                    case "3":
                        if (apt.area < 80 || apt.area > 120) return false;
                        break;
                    case "4":
                        if (apt.area < 120) return false;
                        break;
                }
            }

            return true;
        });
    }, [apartments, filters]);

    return (
        <SafeAreaView
            key={key} // wymuszamy remount przy zmianie URL
            className="flex-1 bg-white relative pt-[40px]"
        >
            <FlatList
                data={filteredApartments}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ApartmentCard apartment={item} />}
                contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
            />

            <Pressable
                onPress={() => setFilterVisible(true)}
                className="absolute top-[80px] right-0 bg-primary rounded-full shadow-lg"
                style={{ elevation: 5 }}
            >
                <Text className="text-black font-bold px-8 py-4 ">Filtry</Text>
            </Pressable>

            <FilterPanel
                visible={filterVisible}
                onClose={() => setFilterVisible(false)}
                filters={filters}
                setFilters={setFilters}
            />
        </SafeAreaView>
    );
}

/**
 * Filter panel for real estate offers.
 *
 * A slide-in panel component that allows users to input
 * various search filters (e.g., location, price, number of rooms).
 * Appears from the right side when `visible` is true.
 *
 * Filter values are stored in the external `filters` state
 * and updated dynamically via `setFilters`.
 *
 * @param visible - Whether the panel is visible (slide-in).
 * @param onClose - Function called to close the panel.
 * @param filters - Object representing current filter values.
 * @param setFilters - Function to update the filters state.
 */

import { useEffect, useRef } from 'react';
import {
    Animated,
    Pressable,
    Text, TextInput,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import {useStateContext} from "@/src/contexts/StateContext";
import {translation} from "@/src/translation";

export interface Filters {
    city: string;
    priceMin: string;
    priceMax: string;
    roomsMin: string;
    roomsMax: string;
    bedroomsMin: string;
    bedroomsMax: string;
    furnished: string;         
    petsAllowed: string;       
    shortTermAllowed: string;  
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
    const { langId } = useStateContext();


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
                <Text className="text-lg font-bold mb-4">{translation[langId].filterPanel.filterOffers}</Text>

                <Text className="font-semibold">{translation[langId].filterPanel.city}</Text>
                <TextInput
                    className="border border-gray-400 rounded p-2 mb-4"
                    placeholder={translation[langId].filterPanel.cityPlaceholder}
                    value={filters.city}
                    onChangeText={city => setFilters({ ...filters, city })}
                />

                <Text className="font-semibold">{translation[langId].filterPanel.priceMin}</Text>
                <TextInput
                    keyboardType="numeric"
                    className="border border-gray-400 rounded p-2 mb-4"
                    placeholder={translation[langId].filterPanel.priceMinPlaceholder}
                    value={filters.priceMin}
                    onChangeText={priceMin => setFilters({ ...filters, priceMin })}
                />
                <Text className="font-semibold">{translation[langId].filterPanel.priceMax}</Text>
                <TextInput
                    keyboardType="numeric"
                    className="border border-gray-400 rounded p-2 mb-4"
                    placeholder={translation[langId].filterPanel.priceMaxPlaceholder}
                    value={filters.priceMax}
                    onChangeText={priceMax => setFilters({ ...filters, priceMax })}
                />

                <Text className="font-semibold">{translation[langId].filterPanel.roomsMin}</Text>
                <TextInput
                    keyboardType="numeric"
                    className="border border-gray-400 rounded p-2 mb-4"
                    placeholder={translation[langId].filterPanel.roomsMinPlaceholder}
                    value={filters.roomsMin}
                    onChangeText={roomsMin => setFilters({ ...filters, roomsMin })}
                />
                <Text className="font-semibold">{translation[langId].filterPanel.roomsMax}</Text>
                <TextInput
                    keyboardType="numeric"
                    className="border border-gray-400 rounded p-2 mb-4"
                    placeholder={translation[langId].filterPanel.roomsMaxPlaceholder}
                    value={filters.roomsMax}
                    onChangeText={roomsMax => setFilters({ ...filters, roomsMax })}
                />

                <Text className="font-semibold">{translation[langId].filterPanel.bedroomsMin}</Text>
                <TextInput
                    keyboardType="numeric"
                    className="border border-gray-400 rounded p-2 mb-4"
                    placeholder={translation[langId].filterPanel.bedroomsMinPlaceholder}
                    value={filters.bedroomsMin}
                    onChangeText={bedroomsMin => setFilters({ ...filters, bedroomsMin })}
                />
                <Text className="font-semibold">{translation[langId].filterPanel.bedroomsMax}</Text>
                <TextInput
                    keyboardType="numeric"
                    className="border border-gray-400 rounded p-2 mb-4"
                    placeholder={translation[langId].filterPanel.bedroomsMaxPlaceholder}
                    value={filters.bedroomsMax}
                    onChangeText={bedroomsMax => setFilters({ ...filters, bedroomsMax })}
                />

                <Text className="font-semibold">{translation[langId].filterPanel.furnished}</Text>
                <TextInput
                    className="border border-gray-400 rounded p-2 mb-4"
                    placeholder={translation[langId].filterPanel.furnishedPlaceholder}
                    value={filters.furnished}
                    onChangeText={furnished => setFilters({ ...filters, furnished })}
                />

                <Text className="font-semibold">{translation[langId].filterPanel.animals}</Text>
                <TextInput
                    className="border border-gray-400 rounded p-2 mb-4"
                    placeholder={translation[langId].filterPanel.animalsPlaceholder}
                    value={filters.petsAllowed}
                    onChangeText={petsAllowed => setFilters({ ...filters, petsAllowed })}
                />

                <Text className="font-semibold">{translation[langId].filterPanel.short}</Text>
                <TextInput
                    className="border border-gray-400 rounded p-2 mb-4"
                    placeholder={translation[langId].filterPanel.shortPlaceholder}
                    value={filters.shortTermAllowed}
                    onChangeText={shortTermAllowed => setFilters({ ...filters, shortTermAllowed })}
                />

                <Pressable
                    onPress={onClose}
                    className="mt-4 bg-gray-200 rounded p-3 items-center"
                >
                    <Text>{translation[langId].filterPanel.close}</Text>
                </Pressable>
            </Animated.View>
        </>
    );
}

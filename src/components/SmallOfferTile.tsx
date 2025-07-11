/**
 * SmallOfferTile component for displaying a compact view of an apartment offer.
 *
 * Renders a clickable tile with:
 * - A thumbnail image (first apartment image) or placeholder background.
 * - Offer title (up to two lines), rent price, and city name.
 * Navigates to the full offer details screen on press.
 *
 * @param offer - The offer object containing data for this tile.
 */
import { useStateContext } from '@/src/contexts/StateContext';
import { Offer } from '@/src/data/offers';
import { useRouter } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';
import {translation} from "@/src/translation";

interface SmallOfferTileProps {
    offer: Offer;
}

export default function SmallOfferTile({ offer }: SmallOfferTileProps) {
    const { state: { apartments }, langId } = useStateContext();
    const apartment = apartments.find(a => a.id === offer.apartmentId);
    const router = useRouter();

    return (
        <Pressable
            onPress={() => router.push(`/offers/${offer.id}`)}
            className="bg-white rounded-lg shadow-md overflow-hidden"
        >
            {apartment?.images[0] ? (
                <Image
                    source={{ uri: apartment.images[0] }}
                    className="w-full h-32"
                    resizeMode="cover"
                />
            ) : (
                <View className="w-full h-24 bg-gray-200" />
            )}

            <View className="p-2">
                <Text className="text-sm font-semibold number-of-lines-2">
                    {offer.title}
                </Text>
                <Text className="text-xs text-gray-600 mt-1">
                    {offer.rentPrice} {translation[langId].smallOfferTile.currency}
                </Text>
                {apartment && (
                    <Text className="text-xs text-gray-500">
                        {apartment.location.city}
                    </Text>
                )}
            </View>
        </Pressable>
    );
}

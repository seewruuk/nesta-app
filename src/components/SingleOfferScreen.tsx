import AppointmentTimePicker from "@/src/components/AppointmentTimePicker";
import Paragraph from "@/src/components/Paragraph";
import { useStateContext } from "@/src/contexts/StateContext";
import {
    Image,
    Linking,
    Pressable,
    ScrollView,
    Text,
    View
} from "react-native";
import Layout from "../components/Layout";
import {ReservedAppointment} from "@/src/data/offers";

interface SingleOfferScreenProps {
    id: string;
}

export default function SingleOfferScreen({ id }: SingleOfferScreenProps) {
    // Destructures necessary data and functions from global context
    const {
        state: { offers, apartments, amenities, currentUserId  },
        addOfferReservation
    } = useStateContext();

    const offer = offers.find(o => o.id === id);
    const apartment = offer
        ? apartments.find(a => a.id === offer.apartmentId)
        : null;

    if (!offer || !apartment) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text>
                    {!offer ? "Oferta nie znaleziona" : "Apartament nie znaleziony"}
                </Text>
            </View>
        );
    }

    const reservedAppointments: ReservedAppointment[] = offer.reservedAppointments ?? [];

    /**
     * Handles reservation confirmation.
     * Prevents reservation if user is not logged in.
     * Creates a new reservation object including the user's ID,
     * and passes it to the context method to update the global state.
     *
     * @param date - Selected reservation date in 'YYYY-MM-DD' format
     * @param time - Selected reservation time (e.g., "14:00")
     */
    const handleConfirmReservation = (date: string, time: string) => {
        if (!currentUserId) return;

        const newReservation: ReservedAppointment = { date, time, userId: currentUserId };
        addOfferReservation(offer.id, newReservation);
    };

    /**
     * Opens the Google Maps link for the apartment's location using deep linking.
     */
    const openMap = () => {
        Linking.openURL(apartment.googleMapsLink);
    };

    return (
        <Layout>
            <ScrollView className="flex-1 p-4 gap-5">
                {apartment.images.length > 0 && (
                    <Image
                        source={{ uri: apartment.images[0] }}
                        className="w-full h-64 rounded-lg mb-4"
                        resizeMode="cover"
                    />
                )}

                <Text className="text-2xl font-bold mb-1">{offer.title}</Text>
                <Text className="text-gray-600 mb-4">
                    {apartment.location.city}, {apartment.location.district}
                </Text>

                {currentUserId ? (
                    <AppointmentTimePicker
                        testID="appointment-time-picker"
                        onConfirmReservation={handleConfirmReservation}
                        reservedAppointments={reservedAppointments}
                    />
                ) : (
                    <Text className="text-gray-500 italic mb-1">
                        Zaloguj się, aby zarezerwować termin oględzin.
                    </Text>
                )}

                <View className="mb-6">
                    <Text className="text-xl font-semibold mb-2">Szczegóły oferty</Text>
                    <Paragraph text={offer.description} />
                    <Text>Cena najmu: {offer.rentPrice} PLN</Text>
                    <Text>Kaucja: {offer.deposit} PLN</Text>
                    <Text>Internet: {offer.extraFees.internet}</Text>
                    <Text>Rachunki: {offer.extraFees.utilities}</Text>
                    <Text>
                        Dostępne od:{" "}
                        {new Date(offer.availableFrom).toLocaleDateString("pl-PL")}
                    </Text>
                    <Text>Min. okres najmu: {offer.minTermMonths} mies.</Text>
                    <Text>
                        Wynajem krótkoterminowy: {offer.shortTermAllowed ? "Tak" : "Nie"}
                    </Text>
                    <Text>
                        Preferowani najemcy: {offer.preferredTenants.join(", ")}
                    </Text>
                    <Text>Parking: {offer.parkingIncluded ? "Tak" : "Nie"}</Text>
                    <Text>Winda: {offer.elevator ? "Tak" : "Nie"}</Text>
                    <Text>
                        Dostęp dla niepełnosprawnych:{" "}
                        {offer.wheelchairAccess ? "Tak" : "Nie"}
                    </Text>
                    <Text>Zwierzęta: {offer.petsAllowed}</Text>
                    <Text>TV & Internet: {offer.tvInternet ? "Tak" : "Nie"}</Text>
                    <Text>Ogrzewanie: {offer.heatingType}</Text>
                    <Text>Palenie: {offer.smokingAllowed}</Text>
                    <Text>Piwnica: {offer.cellar ? "Tak" : "Nie"}</Text>
                </View>

                <View className="mb-6">
                    <Text className="text-xl font-semibold mb-2">
                        Szczegóły apartamentu
                    </Text>
                    <Text>Typ: {apartment.type}</Text>
                    <Text>Powierzchnia: {apartment.area} m²</Text>
                    <Text>Ilość pokoi: {apartment.roomsCount}</Text>
                    <Text>Ilość sypialni: {apartment.bedroomsCount}</Text>
                    <Text>Łazienki: {apartment.bathroomsCount}</Text>
                    <Text>Piętro: {apartment.floor}</Text>
                    <Text>Umeblowane: {apartment.furnished}</Text>
                    <Text>Adres: {apartment.location.fullAddress}</Text>
                    <Pressable onPress={openMap} className="mb-2">
                        <Text className="text-blue-500">Zobacz w Google Maps</Text>
                    </Pressable>
                    <Text>
                        Udogodnienia:{" "}
                        {apartment.amenities
                            .map(id => amenities.find(a => a.id === id)?.name)
                            .filter(Boolean)
                            .join(", ")}
                    </Text>
                </View>
            </ScrollView>
        </Layout>
    );
}
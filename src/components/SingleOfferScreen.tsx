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
import { translation } from "../translation";

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
                        {translation[langId].SingleOfferScreen.loginToReserve}
                    </Text>
                )}

                <View className="mb-6">
                    <Text className="text-xl font-semibold mb-2">{translation[langId].SingleOfferScreen.detailsTitle}</Text>
                    <Paragraph text={offer.description} />
                    <Text>{translation[langId].SingleOfferScreen.rentalPrice}: {offer.rentPrice} PLN</Text>
                    <Text>{translation[langId].SingleOfferScreen.deposit}: {offer.deposit} PLN</Text>
                    <Text>{translation[langId].SingleOfferScreen.internet}: {offer.extraFees.internet}</Text>
                    <Text>{translation[langId].SingleOfferScreen.utilities}: {offer.extraFees.utilities}</Text>
                    <Text>
                       {translation[langId].SingleOfferScreen.availableFrom}:{" "}
                        {new Date(offer.availableFrom).toLocaleDateString("pl-PL")}
                    </Text>
                    <Text>{translation[langId].SingleOfferScreen.minTerm}: {offer.minTermMonths} mies.</Text>
                    <Text>
                        {translation[langId].SingleOfferScreen.shortTerm}: {offer.shortTermAllowed ? "Tak" : "Nie"}
                    </Text>
                    <Text>
                        {translation[langId].SingleOfferScreen.preferredTenants}: {offer.preferredTenants.join(", ")}
                    </Text>
                    <Text>{translation[langId].SingleOfferScreen.parking}: {offer.parkingIncluded ? "Tak" : "Nie"}</Text>
                    <Text>{translation[langId].SingleOfferScreen.elevator}: {offer.elevator ? "Tak" : "Nie"}</Text>
                    <Text>
                        {translation[langId].SingleOfferScreen.wheelchairAccess}:{" "}
                        {offer.wheelchairAccess ? "Tak" : "Nie"}
                    </Text>
                    <Text>{translation[langId].SingleOfferScreen.petsAllowed}: {offer.petsAllowed}</Text>
                    <Text>{translation[langId].SingleOfferScreen.tvInternet}: {offer.tvInternet ? "Tak" : "Nie"}</Text>
                    <Text>{translation[langId].SingleOfferScreen.heating}: {offer.heatingType}</Text>
                    <Text>{translation[langId].SingleOfferScreen.smoking}: {offer.smokingAllowed}</Text>
                    <Text>{translation[langId].SingleOfferScreen.cellar}: {offer.cellar ? "Tak" : "Nie"}</Text>
                </View>

                <View className="mb-6">
                    <Text className="text-xl font-semibold mb-2">
                        {translation[langId].SingleOfferScreen.apartmentDetails}
                    </Text>
                    <Text>{translation[langId].SingleOfferScreen.type}: {apartment.type}</Text>
                    <Text>{translation[langId].SingleOfferScreen.area}: {apartment.area} m²</Text>
                    <Text>{translation[langId].SingleOfferScreen.rooms}: {apartment.roomsCount}</Text>
                    <Text>{translation[langId].SingleOfferScreen.bedrooms}: {apartment.bedroomsCount}</Text>
                    <Text>{translation[langId].SingleOfferScreen.bathrooms}: {apartment.bathroomsCount}</Text>
                    <Text>{translation[langId].SingleOfferScreen.floor}: {apartment.floor}</Text>
                    <Text>{translation[langId].SingleOfferScreen.furnished}: {apartment.furnished}</Text>
                    <Text>{translation[langId].SingleOfferScreen.address}: {apartment.location.fullAddress}</Text>
                    <Pressable onPress={openMap} className="mb-2">
                        <Text className="text-blue-500">{translation[langId].SingleOfferScreen.viewOnMaps}</Text>
                    </Pressable>
                    <Text>
                        {translation[langId].SingleOfferScreen.amenities}:{" "}
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
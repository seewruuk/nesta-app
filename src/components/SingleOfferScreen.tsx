/**
 * SingleOfferScreen component.
 *
 * Displays detailed information about a specific rental offer and its associated apartment.
 * Users can view offer description, amenities, availability, pricing, and reserve appointments if logged in.
 * The component supports multilingual translations and provides a Google Maps link to the apartment location.
 *
 * Props:
 * - id (string): The ID of the offer to be displayed.
 *
 * Features:
 * - Displays an apartment image, location, and full rental details.
 * - Allows logged-in users to choose an appointment time using AppointmentTimePicker.
 * - Displays apartment specifications and additional amenities.
 * - Offers a map button to open the apartment location in Google Maps.
 *
 * @component
 */
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
    const {
        state: { offers, apartments, amenities, currentUserId, langId  },
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
     * Constructs a new ReservedAppointment and adds it to the offer if a user is logged in.
     *
     * @param date - The selected reservation date (YYYY-MM-DD).
     * @param time - The selected reservation time (HH:mm).
     */
    const handleConfirmReservation = (date: string, time: string) => {
        if (!currentUserId) return;

        const newReservation: ReservedAppointment = { date, time, userId: currentUserId };
        addOfferReservation(offer.id, newReservation);
    };

    /**
     * Opens the apartment location in Google Maps using the URL provided in apartment.googleMapsLink.
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
                        {translation[langId].singleOffer.loginToReserve}
                    </Text>
                )}

                <View className="mb-6">
                    <Text className="text-xl font-semibold mb-2">{translation[langId].singleOffer.detailsTitle}</Text>
                    <Paragraph text={offer.description} />
                    <Text>{translation[langId].singleOffer.rentalPrice}: {offer.rentPrice} PLN</Text>
                    <Text>{translation[langId].singleOffer.deposit}: {offer.deposit} PLN</Text>
                    <Text>{translation[langId].singleOffer.internet}: {offer.extraFees.internet}</Text>
                    <Text>{translation[langId].singleOffer.utilities}: {offer.extraFees.utilities}</Text>
                    <Text>
                       {translation[langId].singleOffer.availableFrom}:{" "}
                        {new Date(offer.availableFrom).toLocaleDateString("pl-PL")}
                    </Text>
                    <Text>{translation[langId].singleOffer.minTerm}: {offer.minTermMonths} mies.</Text>
                    <Text>
                        {translation[langId].singleOffer.shortTerm}: {offer.shortTermAllowed ? "Tak" : "Nie"}
                    </Text>
                    <Text>
                        {translation[langId].singleOffer.preferredTenants}: {offer.preferredTenants.join(", ")}
                    </Text>
                    <Text>{translation[langId].singleOffer.parking}: {offer.parkingIncluded ? "Tak" : "Nie"}</Text>
                    <Text>{translation[langId].singleOffer.elevator}: {offer.elevator ? "Tak" : "Nie"}</Text>
                    <Text>
                        {translation[langId].singleOffer.wheelchairAccess}:{" "}
                        {offer.wheelchairAccess ? "Tak" : "Nie"}
                    </Text>
                    <Text>{translation[langId].singleOffer.petsAllowed}: {offer.petsAllowed}</Text>
                    <Text>{translation[langId].singleOffer.tvInternet}: {offer.tvInternet ? "Tak" : "Nie"}</Text>
                    <Text>{translation[langId].singleOffer.heating}: {offer.heatingType}</Text>
                    <Text>{translation[langId].singleOffer.smoking}: {offer.smokingAllowed}</Text>
                    <Text>{translation[langId].singleOffer.cellar}: {offer.cellar ? "Tak" : "Nie"}</Text>
                </View>

                <View className="mb-6">
                    <Text className="text-xl font-semibold mb-2">
                        {translation[langId].singleOffer.apartmentDetails}
                    </Text>
                    <Text>{translation[langId].singleOffer.type}: {apartment.type}</Text>
                    <Text>{translation[langId].singleOffer.area}: {apartment.area} m²</Text>
                    <Text>{translation[langId].singleOffer.rooms}: {apartment.roomsCount}</Text>
                    <Text>{translation[langId].singleOffer.bedrooms}: {apartment.bedroomsCount}</Text>
                    <Text>{translation[langId].singleOffer.bathrooms}: {apartment.bathroomsCount}</Text>
                    <Text>{translation[langId].singleOffer.floor}: {apartment.floor}</Text>
                    <Text>{translation[langId].singleOffer.furnished}: {apartment.furnished}</Text>
                    <Text>{translation[langId].singleOffer.address}: {apartment.location.fullAddress}</Text>
                    <Pressable onPress={openMap} className="mb-2">
                        <Text className="text-blue-500">{translation[langId].singleOffer.viewOnMaps}</Text>
                    </Pressable>
                    <Text>
                        {translation[langId].singleOffer.amenities}:{" "}
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
import { Text, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useState} from 'react';
import { Offer } from '@/src/data/offers';
import { useRouter } from 'expo-router';
import { useStateContext } from "@/src/contexts/StateContext";
import uuid from 'react-native-uuid';
import {translation} from "@/src/translation";

export default function CreateOffer() {
    const {
        state: { currentUserId }, addOffer, langId
    } = useStateContext();
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [rentPrice, setRentPrice] = useState('');
    const [availableFrom, setAvailableFrom] = useState('');

    const handleSubmit = () => {
        if (!title || !description || !rentPrice || !availableFrom) {
            Alert.alert(translation[langId].createOffer.alertEmpty);
            return;
        }

        const newOffer: Offer = {
            id: uuid.v4().toString(),
            apartmentId: 'apt1',
            authorId: currentUserId || 'guest',
            title,
            description,
            rentPrice: parseInt(rentPrice),
            deposit: parseInt(rentPrice),
            extraFees: {
                internet: translation[langId].createOffer.utilities,
                utilities: translation[langId].createOffer.utilities,
            },
            availableFrom,
            minTermMonths: 6,
            shortTermAllowed: false,
            preferredTenants: [],
            parkingIncluded: false,
            elevator: false,
            wheelchairAccess: false,
            petsAllowed: translation[langId].createOffer.utilities,
            tvInternet: false,
            heatingType: translation[langId].createOffer.utilities,
            smokingAllowed: translation[langId].createOffer.utilities,
            cellar: false,
            status: translation[langId].createOffer.status,
        };

        addOffer(newOffer);
        Alert.alert(translation[langId].createOffer.alertCreated);
        router.back();
    };

    return (
        <ScrollView className="flex-1 p-4 bg-white"
                    keyboardShouldPersistTaps="handled">
            <Text className="text-xl font-bold mb-2">{translation[langId].createOffer.newOffer}</Text>  keyboardShouldPersistTaps="handled"

            <TextInput className="border rounded p-2 mb-3" placeholder={translation[langId].createOffer.titlePlaceHolder} value={title} onChangeText={setTitle} />
            <TextInput className="border rounded p-2 mb-3" placeholder={translation[langId].createOffer.descriptionPlaceHolder} value={description} onChangeText={setDescription} multiline />
            <TextInput className="border rounded p-2 mb-3" placeholder={translation[langId].createOffer.pricePlaceHolder} value={rentPrice} onChangeText={setRentPrice} keyboardType="numeric" />
            <TextInput className="border rounded p-2 mb-3" placeholder={translation[langId].createOffer.availabilityPlaceHolder} value={availableFrom} onChangeText={setAvailableFrom} />

            <TouchableOpacity className="bg-blue-600 rounded p-3" onPress={handleSubmit}>
                <Text className="text-white text-center">{translation[langId].createOffer.submitButtonName}</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

import { Text, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useState} from 'react';
import { Offer } from '@/src/data/offers';
import { useRouter } from 'expo-router';
import { useStateContext } from "@/src/contexts/StateContext";
import uuid from 'react-native-uuid';

export default function CreateOffer() {
    const {
        state: { currentUserId }, addOffer
    } = useStateContext();
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [rentPrice, setRentPrice] = useState('');
    const [availableFrom, setAvailableFrom] = useState('');

    const handleSubmit = () => {
        if (!title || !description || !rentPrice || !availableFrom) {
            Alert.alert('Uzupełnij wszystkie pola!');
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
                internet: 'Dodatkowe',
                utilities: 'Dodatkowe',
            },
            availableFrom,
            minTermMonths: 6,
            shortTermAllowed: false,
            preferredTenants: [],
            parkingIncluded: false,
            elevator: false,
            wheelchairAccess: false,
            petsAllowed: 'Do ustalenia',
            tvInternet: false,
            heatingType: 'centralne',
            smokingAllowed: 'Do ustalenia',
            cellar: false,
            status: 'Szkic',
        };

        addOffer(newOffer);
        Alert.alert('Oferta zapisana jako szkic!');
        router.back();
    };

    return (
        <ScrollView className="flex-1 p-4 bg-white">
            <Text className="text-xl font-bold mb-2">Nowa oferta</Text>

            <TextInput className="border rounded p-2 mb-3" placeholder="Tytuł" value={title} onChangeText={setTitle} />
            <TextInput className="border rounded p-2 mb-3" placeholder="Opis" value={description} onChangeText={setDescription} multiline />
            <TextInput className="border rounded p-2 mb-3" placeholder="Cena najmu (PLN)" value={rentPrice} onChangeText={setRentPrice} keyboardType="numeric" />
            <TextInput className="border rounded p-2 mb-3" placeholder="Dostępne od (rrrr-mm-dd)" value={availableFrom} onChangeText={setAvailableFrom} />

            <TouchableOpacity className="bg-blue-600 rounded p-3" onPress={handleSubmit}>
                <Text className="text-white text-center">Zapisz ofertę</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

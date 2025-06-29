import Messages from '@/src/components/Messages';
import OfferCard from '@/src/components/OfferCard';
import Transactions from '@/src/components/Transactions';
import { useStateContext } from '@/src/contexts/StateContext';
import { Transaction } from '@/src/data/transactions';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import {users} from "@/src/data/users";
import {Offer} from "@/src/data/offers";
import {translation} from "@/src/translation";


export default function Dashboard() {
    const router = useRouter();
    const {
        state: { currentUserId, offers, transactions },
        langId
    } = useStateContext();

    useEffect(() => {
        if (!currentUserId) {
            router.replace('/login');
        }
    }, [currentUserId]);

    if (!currentUserId) {
        return null;
    }

    const currentUser = users.find(u => u.id === currentUserId);
    const role = currentUser?.role;

    let visibleOffers: Offer[] = [];
    let visibleTransactions: Transaction[] = [];

    if (role === 'Wynajmujący') {
        visibleOffers = offers.filter(o => o.authorId === currentUserId);
    } else if (role === 'Najemca') {
        const rented = offers.find(o => o.tenantId === currentUserId);
        if (rented) visibleOffers = [rented];
    }

    visibleTransactions = transactions.filter(t => t.tenantId === currentUserId);


    return (
        <ScrollView className="flex-1 bg-white pt-[60px] px-4 space-y-6">
            <View>
                <Text className="text-xl font-bold mb-2">
                    {currentUser?.role === 'Najemca' ? translation[langId].dashboard.rentier.title : translation[langId].dashboard.landlord.title}
                </Text>
                {visibleOffers.length === 0 ? (
                    <Text className="text-gray-600">
                        {currentUser?.role === 'Najemca'
                            ? translation[langId].dashboard.rentier.noOffersMessage
                            : translation[langId].dashboard.landlord.noOffersMessage}
                    </Text>
                ) : (
                    visibleOffers.map(offer => (
                        <OfferCard key={offer.id} offer={offer} />
                    ))
                )}
            </View>

            <View>
                {currentUser?.role === 'Najemca' && (
                    <View>
                        <Text className="text-xl font-bold mb-2">
                            {translation[langId].dashboard.transactionsHeader}
                        </Text>
                        {visibleTransactions.length === 0 ? (
                            <Text className="text-gray-600">
                                {translation[langId].dashboard.transactionsNotFound}
                            </Text>
                        ) : (
                            <Transactions
                                transactions={visibleTransactions}
                                maxElements={5}
                                onPressItem={tx =>
                                    router.push({ pathname: '/transactions/[id]', params: { id: tx.id } })
                                }
                            />
                        )}
                    </View>
                )}
            </View>

            <View>
                <Text className="text-xl font-bold mb-2">{translation[langId].dashboard.messagesHeader}</Text>
                <Messages messages={[]} maxElements={2} />
            </View>

            <View className={"h-[250px]"}>

            </View>
        </ScrollView>
    );
}

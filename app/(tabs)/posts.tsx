import { useStateContext } from '@/src/contexts/StateContext';
import { Post } from '@/src/data/posts';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView,
    Switch,
    Text,
    TextInput,
    View,
} from 'react-native';

export default function PostsScreen() {
    const router = useRouter();
    const {
        state: { posts },
        addPost,
    } = useStateContext();

    const [location, setLocation] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isLinkedOffer, setIsLinkedOffer] = useState(false);

    const [searchLocation, setSearchLocation] = useState('');
    const [filterLinked, setFilterLinked] = useState<'all' | 'linked' | 'unlinked'>('all');

    const handleAdd = () => {
        if (!location.trim() || !title.trim() || !description.trim()) return;
        const newPost: Post = {
            id: `post${Date.now()}`,
            location: location.trim(),
            title: title.trim(),
            description: description.trim(),
            isLinkedOffer,
            offerId: isLinkedOffer ? 'offer1' : undefined,
            authorId: 'user1',
        };
        addPost(newPost);
        setLocation('');
        setTitle('');
        setDescription('');
        setIsLinkedOffer(false);
    };

    const filteredPosts = useMemo(
        () =>
            posts.filter(p => {
                if (
                    searchLocation &&
                    !p.location.toLowerCase().includes(searchLocation.toLowerCase())
                )
                    return false;
                if (filterLinked === 'linked' && !p.isLinkedOffer) return false;
                if (filterLinked === 'unlinked' && p.isLinkedOffer) return false;
                return true;
            }),
        [posts, searchLocation, filterLinked]
    );

    const ListHeader = () => (
        <View className="p-4 bg-white">
            <Text className="text-lg font-bold mb-2">Dodaj ogłoszenie</Text>
            <View className="mb-4">
                <TextInput
                    className="border border-gray-300 rounded px-3 py-2 mb-2"
                    placeholder="Lokalizacja"
                    value={location}
                    onChangeText={setLocation}
                />
                <TextInput
                    className="border border-gray-300 rounded px-3 py-2 mb-2"
                    placeholder="Nagłówek"
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    className="border border-gray-300 rounded px-3 py-2 mb-2 h-20"
                    placeholder="Opis ogłoszenia"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                />
                <View className="flex-row items-center justify-between mb-2">
                    <Text>Czy post dotyczy oferty?</Text>
                    <Switch
                        value={isLinkedOffer}
                        onValueChange={setIsLinkedOffer}
                    />
                </View>
                <Pressable
                    className="bg-blue-500 rounded px-4 py-2 items-center"
                    onPress={handleAdd}
                >
                    <Text className="text-white font-semibold">Dodaj ogłoszenie</Text>
                </Pressable>
            </View>
            <Text className="text-lg font-bold mb-2">Lista ogłoszeń</Text>
            <TextInput
                className="border border-gray-300 rounded px-3 py-2 mb-2"
                placeholder="Szukaj po lokalizacji"
                value={searchLocation}
                onChangeText={setSearchLocation}
            />
            <View className="flex-row space-x-2 mb-4">
                <Pressable
                    className={`px-3 py-1 border rounded ${filterLinked === 'all' ? 'bg-gray-200' : ''}`}
                    onPress={() => setFilterLinked('all')}
                >
                    <Text>Wszystkie</Text>
                </Pressable>
                <Pressable
                    className={`px-3 py-1 border rounded ${filterLinked === 'linked' ? 'bg-gray-200' : ''}`}
                    onPress={() => setFilterLinked('linked')}
                >
                    <Text>Powiązane</Text>
                </Pressable>
                <Pressable
                    className={`px-3 py-1 border rounded ${filterLinked === 'unlinked' ? 'bg-gray-200' : ''}`}
                    onPress={() => setFilterLinked('unlinked')}
                >
                    <Text>Niepowiązane</Text>
                </Pressable>
            </View>
        </View>
    );

    return (
        <KeyboardAvoidingView
            className="flex-1 bg-gray-50"
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <SafeAreaView className="flex-1">
                <FlatList
                    data={filteredPosts}
                    keyExtractor={p => p.id}
                    renderItem={({ item }) => (
                        <View className="mx-4 mb-3 p-4 bg-white border border-gray-200 rounded">
                            <Text className="text-sm text-gray-500">{item.location}</Text>
                            <Text className="text-base font-semibold my-1">{item.title}</Text>
                            <Text className="text-sm text-gray-700" numberOfLines={2}>
                                {item.description}
                            </Text>
                            {item.isLinkedOffer && (
                                <Pressable
                                    className="mt-2"
                                    onPress={() => router.push(`/offers/${item.offerId}`)}
                                >
                                    <Text className="text-blue-500 font-semibold">ZOBACZ OFERTĘ</Text>
                                </Pressable>
                            )}
                        </View>
                    )}
                    ListHeaderComponent={ListHeader}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="none"
                />
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}
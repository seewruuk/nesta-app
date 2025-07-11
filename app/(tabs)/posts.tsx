/**
 * PostsScreen component.
 *
 * Provides a form to create new posts and displays a filtered list of existing posts.
 * Users can enter location, title, description, and optionally link the post to an offer.
 * The list can be filtered by location text and by linked/unlinked status.
 *
 * @component
 */

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
import {translation} from "@/src/translation";

export default function PostsScreen() {
    const router = useRouter();
    const {
        state: { posts, langId },
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
            isOfferLinked: isLinkedOffer,
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
                if (filterLinked === 'linked' && !p.isOfferLinked) return false;
                if (filterLinked === 'unlinked' && p.isOfferLinked) return false;
                return true;
            }),
        [posts, searchLocation, filterLinked]
    );

    const ListHeader = () => (
        <View className="p-4 bg-white">
            <Text className="text-lg font-bold mb-2">{translation[langId].posts.addPost}</Text>
            <View className="mb-4">
                <TextInput
                    className="border border-gray-300 rounded px-3 py-2 mb-2"
                    placeholder={translation[langId].posts.localizationPlaceholder}
                    value={location}
                    onChangeText={setLocation}
                />
                <TextInput
                    className="border border-gray-300 rounded px-3 py-2 mb-2"
                    placeholder={translation[langId].posts.headerPlaceholder}
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    className="border border-gray-300 rounded px-3 py-2 mb-2 h-20"
                    placeholder={translation[langId].posts.descriptionPlaceHolder}
                    value={description}
                    onChangeText={setDescription}
                    multiline
                />
                <View className="flex-row items-center justify-between mb-2">
                    <Text>{translation[langId].posts.doesItConcernOffer}</Text>
                    <Switch
                        value={isLinkedOffer}
                        onValueChange={setIsLinkedOffer}
                    />
                </View>
                <Pressable
                    className="bg-blue-500 rounded px-4 py-2 items-center"
                    onPress={handleAdd}
                >
                    <Text className="text-white font-semibold">{translation[langId].posts.addPost}</Text>
                </Pressable>
            </View>
            <Text className="text-lg font-bold mb-2">{translation[langId].posts.listOfPosts}</Text>
            <TextInput
                className="border border-gray-300 rounded px-3 py-2 mb-2"
                placeholder={translation[langId].posts.searchByLocPlaceholder}
                value={searchLocation}
                onChangeText={setSearchLocation}
            />
            <View className="flex-row space-x-2 mb-4">
                <Pressable
                    className={`px-3 py-1 border rounded ${filterLinked === 'all' ? 'bg-gray-200' : ''}`}
                    onPress={() => setFilterLinked('all')}
                >
                    <Text>{translation[langId].posts.all}</Text>
                </Pressable>
                <Pressable
                    className={`px-3 py-1 border rounded ${filterLinked === 'linked' ? 'bg-gray-200' : ''}`}
                    onPress={() => setFilterLinked('linked')}
                >
                    <Text>{translation[langId].posts.connected}</Text>
                </Pressable>
                <Pressable
                    className={`px-3 py-1 border rounded ${filterLinked === 'unlinked' ? 'bg-gray-200' : ''}`}
                    onPress={() => setFilterLinked('unlinked')}
                >
                    <Text>{translation[langId].posts.notConnected}</Text>
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
                            {item.isOfferLinked && (
                                <Pressable
                                    className="mt-2"
                                    onPress={() => router.push(`/offers/${item.offerId}`)}
                                >
                                    <Text className="text-blue-500 font-semibold">{translation[langId].posts.seeOffer}</Text>
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
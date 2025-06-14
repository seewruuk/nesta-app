// src/screens/UserDetails.tsx

import SmallOfferTile from '@/src/components/SmallOfferTile';
import { useStateContext } from '@/src/contexts/StateContext';
import { Review } from '@/src/data/reviews';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    FlatList,
    Image,
    Modal,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function UserDetails() {
  // stan modalu i formularza
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText]           = useState('');
  const [rating, setRating]       = useState(5);

  const router = useRouter();
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const {
    state: { users, offers, reviews, currentUserId },
    addReview,
  } = useStateContext();

  // znajdź użytkownika
  const user = users.find(u => u.slug === slug);
  if (!user) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Użytkownik nie znaleziony</Text>
      </View>
    );
  }

  // oferty tego użytkownika
  const userOffers = offers.filter(o => o.authorId === user.id);

  // recenzje tego użytkownika z globalnej tablicy
  const userReviews = reviews.filter(
    r => r.targetType === 'user' && r.targetId === user.id
  );

  // czy obecny zalogowany już dodał recenzję?
  const hasReviewed =
    currentUserId != null &&
    userReviews.some(r => r.authorId === currentUserId);

  // funkcja wywoływana w modalu
  const submitReview = () => {
    if (!currentUserId || !text.trim()) return;
    const newReview: Review = {
      id: `rev${Date.now()}`,
      authorId: currentUserId,
      targetType: 'user',
      targetId: user.id,
      text: text.trim(),
      rating,
      date: new Date().toISOString(),
    };
    addReview(newReview);
    setModalVisible(false);
    setText('');
    setRating(5);
  };

  return (
    <>
      <ScrollView className="flex-1 bg-white">
        {/* Banner */}
        {user.coverImage ? (
          <Image
            source={{ uri: user.coverImage }}
            className="w-full h-48"
            resizeMode="cover"
          />
        ) : (
          <View className="w-full h-48 bg-gray-200" />
        )}

        {/* Profil */}
        <View className="px-4 pt-4 items-center">
          {user.avatar ? (
            <Image
              source={{ uri: user.avatar }}
              className="w-24 h-24 rounded-full -mt-12 border-4 border-white"
            />
          ) : (
            <View className="w-24 h-24 bg-gray-300 rounded-full -mt-12 border-4 border-white" />
          )}
          <Text className="text-2xl font-bold mt-2">{user.fullName}</Text>
          <Text className="text-gray-600 text-center mt-1">{user.bio}</Text>
          <View className="flex-row items-center mt-2">
            <Text className="font-semibold mr-2">
              Ocena: {user.rating.toFixed(1)} / 5.0
            </Text>
            <Pressable onPress={() => {/* pokaż wszystkie recenzje */}}>
              <Text className="text-blue-500">Zobacz</Text>
            </Pressable>
          </View>
        </View>

        {/* Oferty */}
        <View className="px-4 mt-6">
          <Text className="text-xl font-bold mb-3">Aktualne oferty</Text>
          {userOffers.length === 0 ? (
            <Text>Brak aktywnych ofert.</Text>
          ) : (
            <FlatList
              data={userOffers}
              horizontal
              keyExtractor={o => o.id}
              renderItem={({ item }) => (
                <View className="mr-4 w-64">
                  <SmallOfferTile offer={item} />
                </View>
              )}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>

        {/* Opinie */}
        <View className="px-4 mt-6 mb-8">
          <Text className="text-xl font-bold mb-3">Opinie</Text>
          {userReviews.map(rev => (
            <View key={rev.id} className="mb-4 p-4 bg-gray-100 rounded">
              <Text className="font-semibold mb-1">{rev.authorId}</Text>
              <Text className="text-gray-700 mb-2">{rev.text}</Text>
              <Text className="text-gray-600">
                Ocena: {rev.rating} / 5.0
              </Text>
            </View>
          ))}
          {currentUserId && !hasReviewed && (
            <Pressable
              className="mt-2 bg-blue-500 rounded py-2 px-4 items-center"
              onPress={() => setModalVisible(true)}
            >
              <Text className="text-white font-semibold">Dodaj opinię</Text>
            </Pressable>
          )}
        </View>
      </ScrollView>

      {/* Modal dodawania opinii */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 bg-black/50 justify-center px-4">
          <View className="bg-white rounded-lg p-6">
            <Text className="text-lg font-bold mb-2">Nowa opinia</Text>
            <TextInput
              className="border border-gray-300 rounded p-2 mb-4 h-24"
              placeholder="Treść opinii"
              value={text}
              onChangeText={setText}
              multiline
            />
            <View className="flex-row items-center mb-4">
              <Text className="mr-2">Ocena:</Text>
              {[1, 2, 3, 4, 5].map(n => (
                <TouchableOpacity key={n} onPress={() => setRating(n)}>
                  <Text className={`text-2xl ${n <= rating ? 'text-yellow-500' : 'text-gray-300'}`}>
                    ★
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View className="flex-row justify-end space-x-2">
              <Pressable
                className="px-4 py-2 bg-gray-200 rounded"
                onPress={() => setModalVisible(false)}
              >
                <Text>Anuluj</Text>
              </Pressable>
              <Pressable
                className="px-4 py-2 bg-blue-500 rounded"
                onPress={submitReview}
              >
                <Text className="text-white">Wyślij</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

// app/register.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useStateContext } from '@/src/contexts/StateContext';

export default function Register() {
    const { register } = useStateContext();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    const handleRegister = () => {
        const res = register(email, username, password, confirm);
        if (!res.success) {
            Alert.alert('Błąd rejestracji', res.error);
        } else {
            router.replace('/');
        }
    };

    return (
        <View className="flex-1 justify-center p-6 bg-white">
            <Text className="text-2xl font-bold mb-4">Rejestracja</Text>
            <TextInput
                className="border border-gray-300 rounded px-3 py-2 mb-4"
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                className="border border-gray-300 rounded px-3 py-2 mb-4"
                placeholder="Nazwa użytkownika"
                autoCapitalize="none"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                className="border border-gray-300 rounded px-3 py-2 mb-4"
                placeholder="Hasło"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                className="border border-gray-300 rounded px-3 py-2 mb-6"
                placeholder="Potwierdź hasło"
                secureTextEntry
                value={confirm}
                onChangeText={setConfirm}
            />
            <Pressable
                className="bg-green-500 rounded px-4 py-3 items-center"
                onPress={handleRegister}
            >
                <Text className="text-white font-semibold">Zarejestruj się</Text>
            </Pressable>
            <Pressable
                className="mt-4 items-center"
                onPress={() => router.push('/login')}
            >
                <Text className="text-blue-500">Masz już konto? Zaloguj się</Text>
            </Pressable>
        </View>
    );
}

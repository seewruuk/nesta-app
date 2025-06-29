/**
 * TransactionScreen component for viewing and finalizing a single transaction.
 *
 * Retrieves the transaction ID from the route parameters, looks up the corresponding
 * transaction in the global state, and displays its details (issue date, due date,
 * amount, description). Provides buttons to mark the transaction as 'paid' or 'cancelled',
 * updating the global state and navigating back to the previous screen.
 *
 * @component
 */
import { useStateContext } from '@/src/contexts/StateContext';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';
import { translation } from '@/src/translation';

export default function Login() {
    const { langId } = useStateContext();
    const { login } = useStateContext();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        const res = login(email, password);
        if (!res.success) {
            Alert.alert('Błąd logowania', res.error);
        } else {
            router.replace('/dashboard');
        }
    };

    return (
        <View className="flex-1 justify-center p-6 bg-white">
            <Text className="text-2xl font-bold mb-4">{translation[langId].login.login}</Text>
            <TextInput
                className="border border-gray-300 rounded px-3 py-2 mb-4"
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                className="border border-gray-300 rounded px-3 py-2 mb-6"
                placeholder="Hasło"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Pressable
                className="bg-blue-500 rounded px-4 py-3 items-center"
                onPress={handleLogin}
            >
                <Text className="text-white font-semibold">{translation[langId].login.signIn}</Text>
            </Pressable>
            <Pressable
                className="mt-4 items-center"
                onPress={() => router.push('/register')}
            >
                <Text className="text-blue-500">{translation[langId].login.noAccount}</Text>
            </Pressable>
        </View>
    );
}

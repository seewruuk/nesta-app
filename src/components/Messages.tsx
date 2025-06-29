import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Message } from '@/src/data/messages'

interface MessagesProps {
    messages: Message[]
    maxElements?: number
}

export default function Messages({ messages, maxElements = 2 }: MessagesProps) {
    const displayed = messages.slice(0, maxElements)

    if (displayed.length === 0) {
        return (
            <View className="py-4">
                <Text className="text-gray-500">Brak wiadomości.</Text>
            </View>
        )
    }

    return (
        <ScrollView className="space-y-4">
            {displayed.map((msg) => (
                <View key={msg.id} className="p-3 bg-blue-50 rounded-lg">
                    <Text className="font-semibold">Od: {msg.sender}</Text>
                    <Text className="text-sm text-gray-600 mb-1">
                        {new Date(msg.date).toLocaleTimeString()}
                    </Text>
                    <Text className="text-base">{msg.content}</Text>
                </View>
            ))}
        </ScrollView>
    )
}

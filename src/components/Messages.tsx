/**
 * Messages list component.
 *
 * Displays up to `maxElements` messages in a vertical scroll. If there are
 * no messages to display, renders a placeholder view.
 *
 * @param messages - Array of Message objects to display.
 * @param maxElements - Maximum number of messages to show (default is 2).
 */

import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Message } from '@/src/data/messages'
import {useStateContext} from "@/src/contexts/StateContext";
import {translation} from "@/src/translation";

interface MessagesProps {
    messages: Message[]
    maxElements?: number
}

export default function Messages({ messages, maxElements = 2 }: MessagesProps) {
    const displayed = messages.slice(0, maxElements)
    const { langId } = useStateContext();

    if (displayed.length === 0) {
        return (
            <View className="py-4">
                <Text className="text-gray-500">{translation[langId].messages.notFound}</Text>
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

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useStateContext } from '@/src/contexts/StateContext';
import { Message as MsgType } from '@/src/types/Message';

export default function ChatScreen() {
    const router = useRouter();
    const {
        state: { currentUserId, messages },
        addMessage,
        deleteMessage,
        markAsRead,
    } = useStateContext();

    const [text, setText] = useState('');

    const chatMsgs = [...messages].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    useEffect(() => {
        if (!currentUserId) {
            router.replace('/login');
        }
    }, [currentUserId]);

    useEffect(() => {
        if (!currentUserId) return;
        chatMsgs.forEach(msg => {
            if (msg.receiverId === currentUserId && !msg.isRead) {
                markAsRead(msg.id);
            }
        });
    }, [chatMsgs, currentUserId]);

    if (!currentUserId) return null;

    const handleSend = () => {
        if (!text.trim()) return;
        const newMsg: MsgType = {
            id: `msg${Date.now()}`,
            senderId: currentUserId,
            receiverId: '', // unused in static view
            message: text.trim(),
            date: new Date().toISOString(),
            isRead: false,
            status: 'sent',
        };
        addMessage(newMsg);
        setText('');

        setTimeout(() => {
            const reply: MsgType = {
                id: `bot${Date.now()}`,
                senderId: 'bot',
                receiverId: '',
                message: 'tak',
                date: new Date().toISOString(),
                isRead: true,
                status: 'read',
            };
            addMessage(reply);
        }, 5000);
    };

    const renderItem = ({ item }: { item: MsgType }) => {
        const isMine = item.senderId === currentUserId;
        const isBot = item.senderId === 'bot';
        return (
            <View
                style={{
                    alignSelf: isMine ? 'flex-end' : 'flex-start',
                    backgroundColor: isMine
                        ? '#DCF8C5'
                        : isBot
                            ? '#FFE0B2'
                            : '#FFF',
                    margin: 4,
                    padding: 8,
                    borderRadius: 8,
                    borderWidth: isBot ? 1 : 0,
                    borderColor: isBot ? '#FF9800' : 'transparent',
                }}
            >
                <Text style={isBot ? { fontStyle: 'italic' } : {}}>{item.message}</Text>
                <Text style={{ fontSize: 10, textAlign: 'right' }}>
                    {new Date(item.date).toLocaleTimeString()}
                </Text>
                <TouchableOpacity onPress={() => deleteMessage(item.id)}>
                    <Text style={{ fontSize: 10, color: 'red' }}>Usuń</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={{ flex: 1, padding: 8, paddingBottom: 150, paddingTop: 50 }}>
            <FlatList
                data={chatMsgs}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                    style={{ flex: 1, borderWidth: 1, borderRadius: 4, padding: 8 }}
                    placeholder="Napisz wiadomość..."
                    value={text}
                    onChangeText={setText}
                />
                <TouchableOpacity onPress={handleSend} style={{ marginLeft: 8 }}>
                    <Text>Wyślij</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

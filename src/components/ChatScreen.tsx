import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useStateContext } from '@/src/contexts/StateContext';
import { Message as MsgType } from '@/src/data/messages';
import {translation} from "@/src/translation";


export default function ChatScreen() {
    const router = useRouter();
    const {
        state: { currentUserId, messages, langId },
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
            receiverId: '',
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
                message: translation[langId].chat.replyMessage,
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
                    <Text style={{ fontSize: 10, color: 'red' }}>{translation[langId].chat.deleteMessage}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={{ flex: 1, padding: 8, paddingBottom: 150, paddingTop: 50 }}>


            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                    style={{ flex: 1, borderWidth: 1, borderRadius: 4, padding: 8 }}
                    placeholder={translation[langId].chat.sendPlaceholder}
                    value={text}
                    onChangeText={setText}
                />
                <TouchableOpacity onPress={handleSend} style={{ marginLeft: 8 }}>
                    <Text>{translation[langId].chat.send}</Text>
                </TouchableOpacity>
            </View>


            <FlatList
                data={chatMsgs}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />

        </View>
    );
}

export interface Message {
    id: string;
    senderId: string;
    receiverId: string;
    message: string;
    date: string;
    isRead: boolean;
    status: 'sent' | 'delivered' | 'read';
}
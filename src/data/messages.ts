/**
 * Messages data module.
 *
 * Contains a list of message objects used for simulating or storing user conversations in the app.
 * Each message includes information about the sender, receiver, content, and timestamp.
 *
 * Types:
 * - Message: Interface defining the structure of a chat message.
 *
 * Exports:
 * - messages: Array of Message objects, representing communication between users.
 *
 * @module
 */



/**
 * Represents a single message exchanged between users.
 *
 * @property id - Unique identifier of the message.
 * @property senderId - ID of the user who sent the message.
 * @property receiverId - ID of the user who received the message.
 * @property content - The body/content of the message.
 * @property timestamp - Date and time when the message was sent (ISO string or Date).
 */
export interface Message {
    id: string;
    senderId: string;
    receiverId: string;
    message: string;
    date: string;
    isRead: boolean;
    status: 'sent' | 'delivered' | 'read';
}
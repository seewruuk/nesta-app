import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import ChatScreen from '@/src/components/ChatScreen';

jest.mock('expo-router', () => ({
    useRouter: () => ({ replace: jest.fn() }),
}));

const mockAddMessage = jest.fn();
const mockDeleteMessage = jest.fn();
const mockMarkAsRead = jest.fn();
const mockUpdateStatus = jest.fn();

jest.mock('@/src/contexts/StateContext', () => ({
    useStateContext: () => ({
        state: { currentUserId: 'user1', messages: [] },
        addMessage: mockAddMessage,
        deleteMessage: mockDeleteMessage,
        markAsRead: mockMarkAsRead,
        updateMessageStatus: mockUpdateStatus,
    }),
}));

describe('<ChatScreen />', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        mockAddMessage.mockClear();
    });

    it('match the snapshot if there is no message', () => {
        const tree = render(<ChatScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('cakk addMessage after tapping send message and show auto reply after 5s timeout', () => {
        const { getByPlaceholderText, getByText } = render(<ChatScreen />);

        const input = getByPlaceholderText('Napisz wiadomość...');
        const sendBtn = getByText('Wyślij');

        fireEvent.changeText(input, 'Test wiadomość');
        fireEvent.press(sendBtn);

        expect(mockAddMessage).toHaveBeenCalledTimes(1);
        const sentPayload = mockAddMessage.mock.calls[0][0];
        expect(sentPayload.message).toBe('Test wiadomość');
        expect(sentPayload.senderId).toBe('user1');
        expect(sentPayload.status).toBe('sent');

        act(() => {
            jest.advanceTimersByTime(5000);
        });
        expect(mockAddMessage).toHaveBeenCalledTimes(2);
        const botPayload = mockAddMessage.mock.calls[1][0];
        expect(botPayload.message).toBe('tak');
        expect(botPayload.senderId).toBe('bot');
        expect(botPayload.status).toBe('read');
    });
});

import Dashboard from '@/app/(tabs)/dashboard';
import { useStateContext } from '@/src/contexts/StateContext';
import { render } from '@testing-library/react-native';
import { useRouter } from 'expo-router';


jest.mock('expo-router', () => ({
    useRouter: jest.fn(),
}));

jest.mock('@/src/contexts/StateContext', () => ({
    useStateContext: jest.fn(),
}));

jest.mock('@/src/components/OfferCard', () => {
    const { Text } = require('react-native'); 
    const MockOfferCard = () => <Text>Mocked OfferCard</Text>;
    MockOfferCard.displayName = 'MockOfferCard';
    return MockOfferCard;
});

jest.mock('@/src/components/Transactions', () => {
    const { Text } = require('react-native');
    const MockTransactions = () => <Text>Mocked Transactions</Text>;
    MockTransactions.displayName = 'MockTransactions';
    return MockTransactions;
});

jest.mock('@/src/components/Messages', () => {
    const { Text } = require('react-native');
    const MockMessages = () => <Text>Mocked Messages</Text>;
    MockMessages.displayName = 'MockMessages';
    return MockMessages;
});


describe('Dashboard', () => {
    const replaceMock = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({ replace: replaceMock });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('redirects to /login if user is not logged in', () => {

        (useStateContext as jest.Mock).mockReturnValue({
            state: { currentUserId: null, offers: [] },
        });

        const { toJSON } = render(<Dashboard />);
        expect(toJSON()).toBeNull();
        expect(replaceMock).toHaveBeenCalledWith('/login');
    });

    it('renders dashboard content when user is logged in with no offers if user does not have any', () => {

        (useStateContext as jest.Mock).mockReturnValue({
            state: { currentUserId: 'user123', offers: [] },
        });

        const { getByText } = render(<Dashboard />);
        expect(getByText('Twoje oferty')).toBeTruthy();
        expect(getByText('Nie masz jeszcze żadnych ofert.')).toBeTruthy()
        expect(getByText('Transakcje')).toBeTruthy()
        expect(getByText('Wiadomości')).toBeTruthy();
    });

    it('renders user offers when present', () => {

        (useStateContext as jest.Mock).mockReturnValue({
            state: {
                currentUserId: 'user123',
                offers: [
                    { id: 'offer1', title: 'Mieszkanie', authorId: 'user123' },
                    { id: 'offer2', title: 'Pokój', authorId: 'otherUser' },
                ],
            },
        });

        const { getByText, queryByText } = render(<Dashboard />);
        expect(getByText('Twoje oferty')).toBeTruthy();
        expect(queryByText('Nie masz jeszcze żadnych ofert.')).toBeNull();
        expect(getByText('Mocked OfferCard')).toBeTruthy();
    });
});

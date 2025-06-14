import React from 'react';
import { render } from '@testing-library/react-native';
import { WelcomeModal } from '../src/components/WelcomeModal';

describe('<WelcomeModal />', () => {


    it('powinien się zgadzać ze snapshotem', () => {
        const tree = render(<WelcomeModal />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renderuje wszystkie pola i przyciski', () => {
        const { getByPlaceholderText, getByText } = render(<WelcomeModal />);

        // inputs
        expect(getByPlaceholderText('Miasto')).toBeTruthy();
        expect(getByPlaceholderText('Min. cena')).toBeTruthy();
        expect(getByPlaceholderText('Max. cena')).toBeTruthy();

        // przyciski Pressable
        expect(getByText('Wynajem')).toBeTruthy();
        expect(getByText('Znd. Współlokatora')).toBeTruthy();

        // główny button Szukaj
        expect(getByText('Szukaj')).toBeTruthy();
    });
});

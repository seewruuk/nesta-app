import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Alert } from 'react-native';
import Login from '../app/login';
import Register from '../app/register';
import { useRouter, replace, push } from 'expo-router';

// Mock useStateContext hook from StateContext
const mockLogin = jest.fn();
const mockRegister = jest.fn();

jest.mock('@/src/contexts/StateContext', () => ({
    useStateContext: () => ({
        login: mockLogin,
        register: mockRegister,
        logout: jest.fn(),
        addApartment: jest.fn(),
        updateApartment: jest.fn(),
        deleteApartment: jest.fn(),
        addOffer: jest.fn(),
        updateOffer: jest.fn(),
        deleteOffer: jest.fn(),
        addUser: jest.fn(),
        updateUser: jest.fn(),
        deleteUser: jest.fn(),
        addAmenity: jest.fn(),
        addPost: jest.fn(),
        updatePost: jest.fn(),
        deletePost: jest.fn(),
    }),
}));

// Mock expo-router for navigation
jest.mock('expo-router', () => {
    const replace = jest.fn();
    const push = jest.fn();
    return {
        __esModule: true,
        useRouter: () => ({ replace, push }),
        replace,
        push,
    };
});

describe('Login Screen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('matches snapshot', () => {
        const tree = render(<Login />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders login inputs and button', () => {
        const { getByPlaceholderText, getByText } = render(<Login />);
        expect(getByPlaceholderText('Email')).toBeTruthy();
        expect(getByPlaceholderText('Hasło')).toBeTruthy();
        expect(getByText('Zaloguj się')).toBeTruthy();
    });

    it('calls login and navigates on success', () => {
        mockLogin.mockReturnValue({ success: true });
        const { getByPlaceholderText, getByText } = render(<Login />);
        fireEvent.changeText(getByPlaceholderText('Email'), 'a@a.com');
        fireEvent.changeText(getByPlaceholderText('Hasło'), 'pass');
        fireEvent.press(getByText('Zaloguj się'));

        expect(mockLogin).toHaveBeenCalledWith('a@a.com', 'pass');
        expect(replace).toHaveBeenCalledWith('/');
    });

    it('alerts on login failure', () => {
        mockLogin.mockReturnValue({ success: false, error: 'Invalid' });
        const alertSpy = jest.spyOn(Alert, 'alert');
        const { getByPlaceholderText, getByText } = render(<Login />);
        fireEvent.changeText(getByPlaceholderText('Email'), 'b@b.com');
        fireEvent.changeText(getByPlaceholderText('Hasło'), 'wrong');
        fireEvent.press(getByText('Zaloguj się'));

        expect(mockLogin).toHaveBeenCalled();
        expect(alertSpy).toHaveBeenCalledWith('Błąd logowania', 'Invalid');
    });
});

describe('Register Screen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('matches snapshot', () => {
        const tree = render(<Register />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders register inputs and button', () => {
        const { getByPlaceholderText, getByText } = render(<Register />);
        expect(getByPlaceholderText('Email')).toBeTruthy();
        expect(getByPlaceholderText('Nazwa użytkownika')).toBeTruthy();
        expect(getByPlaceholderText('Hasło')).toBeTruthy();
        expect(getByPlaceholderText('Potwierdź hasło')).toBeTruthy();
        expect(getByText('Zarejestruj się')).toBeTruthy();
    });

    it('calls register and navigates on success', () => {
        mockRegister.mockReturnValue({ success: true });
        const { getByPlaceholderText, getByText } = render(<Register />);
        fireEvent.changeText(getByPlaceholderText('Email'), 'c@c.com');
        fireEvent.changeText(getByPlaceholderText('Nazwa użytkownika'), 'user');
        fireEvent.changeText(getByPlaceholderText('Hasło'), 'pass');
        fireEvent.changeText(getByPlaceholderText('Potwierdź hasło'), 'pass');
        fireEvent.press(getByText('Zarejestruj się'));

        expect(mockRegister).toHaveBeenCalledWith('c@c.com', 'user', 'pass', 'pass');
        expect(replace).toHaveBeenCalledWith('/');
    });ww
    it('alerts on register failure', () => {
        mockRegister.mockReturnValue({ success: false, error: 'Error' });
        const alertSpy = jest.spyOn(Alert, 'alert');
        const { getByPlaceholderText, getByText } = render(<Register />);
        fireEvent.changeText(getByPlaceholderText('Email'), 'd@d.com');
        fireEvent.changeText(getByPlaceholderText('Nazwa użytkownika'), 'user2');
        fireEvent.changeText(getByPlaceholderText('Hasło'), 'pass1');
        fireEvent.changeText(getByPlaceholderText('Potwierdź hasło'), 'pass2');
        fireEvent.press(getByText('Zarejestruj się'));

        expect(mockRegister).toHaveBeenCalled();
        expect(alertSpy).toHaveBeenCalledWith('Błąd rejestracji', 'Error');
    });
});
// rozszerza matchery o te z @testing-library/jest-native
import '@testing-library/jest-native/extend-expect';

// mock expo-router, jeśli jeszcze tego nie masz
jest.mock('expo-router', () => ({
    useRouter: () => ({ push: jest.fn() }),
}));

module.exports = {
    preset: 'jest-expo',
    testEnvironment: 'node',
    transformIgnorePatterns: [
        'node_modules/(?!(jest-)?react-native|@react-native|expo|@unimodules)'
    ],
    setupFilesAfterEnv: [
        '<rootDir>/jest.setup.js'
    ],
};
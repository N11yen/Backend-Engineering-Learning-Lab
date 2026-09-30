export default {

    testEnvironment: "node",

    roots: ["<rootDir>/src"],

    testMatch: [
        "**/__tests__/**/*.test.js"
    ],

    clearMocks: true,

    restoreMocks: true,

    collectCoverageFrom: [
        "src/**/*.js",
        "!src/docs/**"
    ]

};
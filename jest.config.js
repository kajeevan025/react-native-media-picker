module.exports = {
  preset: "react-native",
  setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect" // Set up jest-native extensions for better assertions
  ],
  transformIgnorePatterns: [
    "node_modules/(?!(@react-native|react-native|@react-native-community|react-navigation|@react-navigation|@react-native-async-storage)/)" // Allow certain modules to be transformed
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest" // Allow Jest to transform TS files with babel-jest
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Optional: If you are using path aliases like "@/components"
  },
  testEnvironment: "node" // Optional: Set the test environment to Node (default is jsdom)
};

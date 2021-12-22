module.exports = {
    preset: "react-native",
    setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
    transformIgnorePatterns: [
        "/node_modules/(?!(@react-native|react-native|react-native-maps|@react-navigation|react-native-shared-element|react-native-iphone-x-helper|react-native-gesture-handler)/).*/"
    ]
  };
  
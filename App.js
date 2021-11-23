"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var native_base_1 = require("native-base");
var AppNavigator_1 = __importDefault(require("./navigation/AppNavigator"));
var expo_font_1 = require("expo-font");
var expo_app_loading_1 = __importDefault(require("expo-app-loading"));
var ssr_1 = require("@react-aria/ssr");
var react_redux_1 = require("react-redux");
var store_1 = require("./app/store");
var theme = (0, native_base_1.extendTheme)({
    fontConfig: {
        SFPro: {
            100: { normal: "sf-pro-text-regular" },
            200: { normal: "sf-pro-text-medium" },
            300: { normal: "sf-pro-text-semibold" },
            400: { normal: "sf-pro-text-bold" },
            500: { normal: "sf-pro-display-regular" },
            600: { normal: "sf-pro-display-bold" },
        },
        fonts: {
            heading: "SFPro",
            body: "SFPro",
            mono: "SFPro",
        },
    },
    colors: {
        // Add new color
        myPrimary: {
            50: "#FF9671",
            100: "#d16f4d",
            200: "#cc5f39",
            300: "#FF9671",
            400: "#a74b2b",
            500: "#934226",
            600: "#7e3921",
            700: "#7e3921",
            800: "#6a301b",
            900: "#550000",
        },
        primaryButton: {
            lightBg: "#2563eb",
            darkBg: "#1e40af",
            lightPressBg: "#1d4ed8",
            darkPressBg: "#1e3a8a",
            lightText: "#fafafa",
            darkText: "#e7e5e4",
            lightPressText: "#fafaf9",
            darkPressText: "#f5f5f4",
        },
        secondaryButton: {
            lightBg: "#2563eb",
            darkBg: "#1e40af",
            lightPressBg: "#1d4ed8",
            darkPressBg: "#1e3a8a",
            lightText: "#fafafa",
            darkText: "#e7e5e4",
            lightPressText: "#fafaf9",
            darkPressText: "#f5f5f4",
        },
    },
    config: {
        useSystemColorMode: true,
        initialColorMode: "dark",
        dependencies: {
            "linear-gradient": require("expo-linear-gradient").LinearGradient,
        },
    },
});
function App() {
    var fontLoaded = (0, expo_font_1.useFonts)({
        "sf-pro-display-regular": require("./assets/Fonts/SF-Pro-Display-Regular.otf"),
        "sf-pro-display-bold": require("./assets/Fonts/SF-Pro-Display-Bold.otf"),
        "sf-pro-text-regular": require("./assets/Fonts/SF-Pro-Text-Regular.otf"),
        "sf-pro-text-bold": require("./assets/Fonts/SF-Pro-Text-Bold.otf"),
        "sf-pro-text-semibold": require("./assets/Fonts/SF-Pro-Text-Semibold.otf"),
        "sf-pro-text-medium": require("./assets/Fonts/SF-Pro-Text-Medium.otf"),
    })[0];
    if (!fontLoaded) {
        return react_1.default.createElement(expo_app_loading_1.default, null);
    }
    return (react_1.default.createElement(react_redux_1.Provider, { store: store_1.store },
        react_1.default.createElement(native_base_1.NativeBaseProvider, { theme: theme },
            react_1.default.createElement(ssr_1.SSRProvider, null,
                react_1.default.createElement(AppNavigator_1.default, null)))));
}
exports.default = App;
// Color Switch Component

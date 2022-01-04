import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  token: "",
  user: {},
  isPasscodeVerified: false,
  loginpass: false,
  restaurantInfo: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.loginpass = action.payload.loginpass;
      state.restaurantInfo = action.payload.restaurantInfo;
    },
    logout: (state) => {
      state.token = "";
      state.isLoggedIn = false;
      state.isPasscodeVerified = false;
      state.user = {};
      state.loginpass = false;
      state.restaurantInfo = undefined;
      AsyncStorage.removeItem("token");
      AsyncStorage.removeItem("user");
      AsyncStorage.removeItem("loginpass");
      AsyncStorage.removeItem("restaurantInfo");
    },
    updateUserInfo: (state, action) => {
      state.user = action.payload.user;
    },
    setLoginPass: (state, action) => {
      state.loginpass = action.payload.loginpass;
    },
    verifyPasscode: (state) => {
      state.isPasscodeVerified = true;
    },
  },
});

export const { login, logout, updateUserInfo, verifyPasscode, setLoginPass } =
  authSlice.actions;
export default authSlice.reducer;

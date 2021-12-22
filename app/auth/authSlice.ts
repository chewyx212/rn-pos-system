import { AsyncStorage } from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  token: "",
  user: {},
  isPasscodeVerified: false,
  loginpass: false,
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
    },
    logout: (state) => {
      state.token = "";
      state.isLoggedIn = false;
      state.isPasscodeVerified = false;
      state.user = {};
      state.loginpass = false;
      AsyncStorage.removeItem("token");
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

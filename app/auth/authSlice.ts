import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  token: "",
  user: {},
  isPasscodeVerified: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = "";
      state.isLoggedIn = false;
      state.isPasscodeVerified = false;

      // localStorage.removeItem("user_token");
      // localStorage.removeItem("user_info");
    },
    updateUserInfo: (state, action) => {
      state.user = action.payload.user;
    },
    verifyPasscode: (state) => {
      state.isPasscodeVerified = true;
    },
  },
});

export const { login, logout, updateUserInfo, verifyPasscode } =
  authSlice.actions;
export default authSlice.reducer;

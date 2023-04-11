import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getAuthCookies,
  getUserDetails,
  setAuthCookies,
  setUserDetails,
} from "../utils/cookies";
import { logInUser, logOutUser, registerUser } from "../actions/authActions";

export const auth = createSlice({
  name: "auth",
  initialState: {
    loggedIn:
      !!getAuthCookies().accessToken &&
      !!getUserDetails().username &&
      !!getUserDetails().role,
    loading: false,
    error: "",
    username: getUserDetails().username || "",
    role: getUserDetails().role || "",
  },
  reducers: {
    registerUser: (state, actions) => {
      const { username, role, accessToken, refreshToken } = actions.payload;
      setAuthCookies({ accessToken, refreshToken });
      setUserDetails({ username, role });
      state.username = username;
      state.role = role;
      state.loggedIn = true;
      toast.success(`Successfully Registered ${actions.payload.username}..!`);
    },
    logIn: (state, actions) => {
      const { username, role, accessToken, refreshToken } = actions.payload;
      setAuthCookies({ accessToken, refreshToken });
      setUserDetails({ username, role });
      state.username = username;
      state.role = role;
      state.loggedIn = true;
      toast.success(`Successfully Logged In ${actions.payload.username}..!`);
    },
    logOut: (state) => {
      setAuthCookies({ accessToken: "", refreshToken: "" });
      setUserDetails({ username: "", role: "" });
      state.username = "";
      state.role = "";
      state.loggedIn = false;
      toast.success(`Successfully Logged Out..!`);
      window.location.href = "/";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        registerUser.pending || logOutUser.pending || logInUser.pending,
        (state) => {
          state.loading = true;
        }
      )
      .addCase(
        registerUser.fulfilled || logOutUser.fulfilled || logInUser.fulfilled,
        (state, action) => {
          state.loading = false;
        }
      )
      .addCase(
        registerUser.rejected || logOutUser.rejected || logInUser.rejected,
        (state, action) => {
          state.loading = false;
          state.error = `${action.error.message}`;
        }
      );
  },
});

export default auth.reducer;

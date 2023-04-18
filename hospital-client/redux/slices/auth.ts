import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getAuthCookies,
  getUserDetails,
  setAuthCookies,
  setUserDetails,
} from "../utils/cookies";

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
    isPending: (state, actions) => {
      toast.dismiss();
      toast.info(actions.payload);
      state.loading = true;
    },
    isFullfilled: (state) => {
      state.loading = false;
    },
    isError: (state, actions) => {
      toast.dismiss();
      toast.error(actions.payload, { autoClose: 3000 });
      state.error = actions.payload;
    },
    registerUser: (state, actions) => {
      const { username, role, accessToken, refreshToken, hospitalId } =
        actions.payload;
      setAuthCookies({ accessToken, refreshToken });
      setUserDetails({ username, role, hospitalId });
      state.username = username;
      state.loading = false;
      state.role = role;
      state.loggedIn = true;
      toast.dismiss();
      toast.success(`Successfully Registered ${actions.payload.username}..!`);
    },
    logIn: (state, actions) => {
      const { username, role, accessToken, refreshToken, hospitalId } =
        actions.payload;
      setAuthCookies({ accessToken, refreshToken });
      setUserDetails({ username, role, hospitalId });
      state.username = username;
      state.role = role;
      state.loading = false;
      state.loggedIn = true;
      toast.dismiss();
      toast.success(`Successfully Logged In ${actions.payload.username}..!`);
    },
    logOut: (state) => {
      setAuthCookies({ accessToken: "", refreshToken: "" });
      setUserDetails({ username: "", role: "", hospitalId: "" });
      state.username = "";
      state.role = "";
      state.loading = false;
      state.loggedIn = false;
      toast.dismiss();
      toast.success(`Successfully Logged Out..!`);
      window.location.href = "/";
    },
  },
});

export default auth.reducer;

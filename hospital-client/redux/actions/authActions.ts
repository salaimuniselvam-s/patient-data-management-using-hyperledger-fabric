import { API_BASE_URL } from "@/constants/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PatientRegistrationFields } from "@/types/patient";
import { DoctorRegistrationFields } from "@/types/doctor";
import axiosInstance from "../axios/axiosInterceptor";
import { auth } from "../slices/auth";
import { UserCredentials } from "@/types/auth";
import { removeAuthCookies, removeUserDetails } from "../utils/cookies";
import { hashPassword } from "@/utils/hash";

interface RegistrationFields {
  role: "patient" | "doctor";
  details: PatientRegistrationFields | DoctorRegistrationFields;
}

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (registrationFields: RegistrationFields, thunkAPI) => {
    try {
      thunkAPI.dispatch(auth.actions.isPending("Registering User"));
      const { role, details } = registrationFields;
      const response = await axios.post(
        `${API_BASE_URL}/admin/${role}s/register`,
        {
          ...details,
          password: hashPassword(details.password),
          firstname: details.username,
        }
      );
      thunkAPI.dispatch(auth.actions.registerUser(response.data));
    } catch (error) {
      console.error(error, "error");
      thunkAPI.dispatch(
        auth.actions.isError("Registration Failed. Please Try Again..")
      );
    } finally {
      thunkAPI.dispatch(auth.actions.isFullfilled());
    }
  }
);

export const logInUser = createAsyncThunk(
  "auth/logIn",
  async (UserDetails: UserCredentials, thunkAPI) => {
    try {
      thunkAPI.dispatch(auth.actions.isPending("Logging In.."));
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        ...UserDetails,
        password: hashPassword(UserDetails.password),
      });
      thunkAPI.dispatch(auth.actions.logIn(response.data));
    } catch (error) {
      thunkAPI.dispatch(
        auth.actions.isError("Login Failed. Please Try Again..")
      );
      console.error(error, "error");
    } finally {
      thunkAPI.dispatch(auth.actions.isFullfilled());
    }
  }
);

export const logOutUser = createAsyncThunk(
  "auth/logOut",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(auth.actions.isPending("Logging Out..."));
      const response = await axiosInstance.delete(
        `${API_BASE_URL}/auth/logout`
      );
      removeAuthCookies();
      removeUserDetails();
      thunkAPI.dispatch(auth.actions.logOut(response.data));
    } catch (error) {
      thunkAPI.dispatch(
        auth.actions.isError("Logout Failed. Please Try Again..")
      );
      console.error(error, "error");
    } finally {
      thunkAPI.dispatch(auth.actions.isFullfilled());
    }
  }
);

import { API_BASE_URL } from "@/constants/constants";
import { createAsyncThunk, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";

import { PatientRegistrationFields } from "@/types/patient";
import { DoctorRegistrationFields } from "@/types/doctor";
import axiosInstance from "../axios/axiosInterceptor";
import { auth } from "../slices/auth";
import { UserCredentials } from "@/types/auth";

interface RegistrationFields {
  role: "patient" | "doctor";
  details: PatientRegistrationFields | DoctorRegistrationFields;
}

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (registrationFields: RegistrationFields, thunkAPI) => {
    try {
      const { role, details } = registrationFields;
      const response = await axios.post(
        `${API_BASE_URL}/admin/${role}s/register`,
        details
      );
      thunkAPI.dispatch(auth.actions.registerUser(response.data));
    } catch (error) {
      console.error(error, "error");
      throw error;
    }
  }
);

export const logInUser = createAsyncThunk(
  "auth/logIn",
  async (UserDetails: UserCredentials, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        UserDetails
      );
      thunkAPI.dispatch(auth.actions.logIn(response.data));
    } catch (error) {
      console.error(error, "error");
      throw error;
    }
  }
);

export const logOutUser = createAsyncThunk(
  "auth/logOut",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(
        `${API_BASE_URL}/auth/logout`
      );
      thunkAPI.dispatch(auth.actions.logOut(response.data));
    } catch (error) {
      console.error(error, "error");
      throw error;
    }
  }
);

export const registerUserAction = (
  role: "patient" | "doctor",
  details: PatientRegistrationFields | DoctorRegistrationFields
) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(registerUser({ role, details }));
  };
};

export const logOutUserAction = () => {
  return (dispatch: Dispatch<any>) => {
    dispatch(logOutUser());
  };
};

export const logInUserAction = (userdetails: UserCredentials) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(logInUser(userdetails));
  };
};

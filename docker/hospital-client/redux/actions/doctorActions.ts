import { createAsyncThunk } from "@reduxjs/toolkit";
import { doctor } from "../slices/doctor";
import { API_BASE_URL } from "@/constants/constants";
import { Dispatch } from "react";
import { getUserDetails } from "../utils/cookies";
import axiosInstance from "../axios/axiosInterceptor";

const getDoctorPersonalDetails = createAsyncThunk(
  "doctor/getDoctorPersonalDetails",
  async (_, thunkAPI) => {
    try {
      const { username, hospitalId } = getUserDetails();
      thunkAPI.dispatch(doctor.actions.isPending());
      const response = await axiosInstance.get(
        `${API_BASE_URL}/doctors/${hospitalId}/${username}`
      );
      thunkAPI.dispatch(doctor.actions.getDoctorPersonalDetails(response.data));
    } catch (error) {
      thunkAPI.dispatch(
        doctor.actions.isError(
          "Fetching Personal Details For Doctor Failed. Please Try Again.."
        )
      );
      console.error(error, "error");
      throw error;
    } finally {
      thunkAPI.dispatch(doctor.actions.isFullfilled());
    }
  }
);

export const getDoctorDetailsAction = () => {
  return (dispatch: Dispatch<any>) => {
    dispatch(getDoctorPersonalDetails());
  };
};

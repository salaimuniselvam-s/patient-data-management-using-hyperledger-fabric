import { createAsyncThunk } from "@reduxjs/toolkit";
import { doctor } from "../slices/doctor";
import { API_BASE_URL } from "@/constants/constants";
import { getUserDetails } from "../utils/cookies";
import axiosInstance from "../axios/axiosInterceptor";

export const getDoctorPersonalDetails = createAsyncThunk(
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
    } finally {
      thunkAPI.dispatch(doctor.actions.isFullfilled());
    }
  }
);

export const getPatientsUnderDoctor = createAsyncThunk(
  "doctor/getPatientsUnderDoctor",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(doctor.actions.isPending());
      const response = await axiosInstance.get(
        `${API_BASE_URL}/admin/patients/_all`
      );
      thunkAPI.dispatch(doctor.actions.getPatientsUnderDoctor(response.data));
    } catch (error) {
      thunkAPI.dispatch(
        doctor.actions.isError(
          "Fetching Patients Under Doctor Failed. Please Try Again.."
        )
      );
      console.error(error, "error");
    } finally {
      thunkAPI.dispatch(doctor.actions.isFullfilled());
    }
  }
);

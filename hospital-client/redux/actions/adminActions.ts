import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios/axiosInterceptor";
import { API_BASE_URL } from "@/constants/constants";
import { admin } from "../slices/admin";

export const getAdminPersonalDetails = createAction(
  "admin/getAdminPersonalDetails"
);

export const getAllPatientDetails = createAsyncThunk(
  "admin/getAllPatientDetails",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(admin.actions.isPending());
      const response = await axiosInstance.get(
        `${API_BASE_URL}/admin/patients/_all`
      );
      thunkAPI.dispatch(admin.actions.getAllPatientDetails(response.data));
    } catch (error) {
      console.error(error, "error");
      thunkAPI.dispatch(
        admin.actions.isError(
          "Retrieving All Patient Records Failed. Please Try Again.."
        )
      );
    } finally {
      thunkAPI.dispatch(admin.actions.isFullfilled());
    }
  }
);

export const getAllDoctorsDetails = createAsyncThunk(
  "admin/getAllDoctorsDetails",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(admin.actions.isPending());
      const response = await axiosInstance.get(
        `${API_BASE_URL}/admin/doctors/_all`
      );
      thunkAPI.dispatch(admin.actions.getAllDoctorsDetails(response.data));
    } catch (error) {
      console.error(error, "error");
      thunkAPI.dispatch(
        admin.actions.isError(
          "Retrieving All Doctor Records Failed. Please Try Again.."
        )
      );
    } finally {
      thunkAPI.dispatch(admin.actions.isFullfilled());
    }
  }
);

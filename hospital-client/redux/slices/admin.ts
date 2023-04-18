import { createSlice } from "@reduxjs/toolkit";
import { getUserDetails } from "../utils/cookies";

export const admin = createSlice({
  name: "admin",
  initialState: {
    loading: true,
    error: "",
    username: getUserDetails().username || "",
    role: getUserDetails().role || "",
    patients: [],
    doctors: [],
    hospitalId: getUserDetails().hospitalId || "",
  },
  reducers: {
    isPending: (state) => {
      state.loading = true;
    },
    isFullfilled: (state) => {
      state.loading = false;
    },
    isError: (state, actions) => {
      state.error = actions.payload;
    },
    getAdminPersonalDetails: (state, actions) => {
      const { username, hospitalId } = getUserDetails();
      state.username = username;
      state.hospitalId = hospitalId;
      state.loading = false;
    },
    getAllPatientDetails: (state, actions) => {
      const { username, hospitalId } = getUserDetails();
      state.username = username;
      state.hospitalId = hospitalId;
      state.patients = actions.payload;
    },
    getAllDoctorsDetails: (state, actions) => {
      const { username, hospitalId } = getUserDetails();
      state.username = username;
      state.hospitalId = hospitalId;
      state.doctors = actions.payload;
    },
  },
});

export default admin.reducer;

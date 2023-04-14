import { createSlice } from "@reduxjs/toolkit";
import { getUserDetails } from "../utils/cookies";

export const doctor = createSlice({
  name: "doctor",
  initialState: {
    loading: true,
    error: "",
    username: getUserDetails().username || "",
    role: getUserDetails().role || "",
    speciality: "",
    hospitalId: getUserDetails().hospitalId || "",
    patients: [],
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
    getDoctorPersonalDetails: (state, actions) => {
      const { speciality } = actions.payload;
      const { username, hospitalId } = getUserDetails();
      state.speciality = speciality;
      state.username = username;
      state.hospitalId = hospitalId;
    },
    getPatientsUnderDoctor: (state, actions) => {
      state.patients = actions.payload;
    },
  },
});

export default doctor.reducer;

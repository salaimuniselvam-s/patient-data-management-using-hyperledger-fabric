import { createSlice } from "@reduxjs/toolkit";
import { getUserDetails } from "../utils/cookies";

export const doctor = createSlice({
  name: "doctor",
  initialState: {
    loading: false,
    error: "",
    username: getUserDetails().username || "",
    role: getUserDetails().role || "",
    speciality: "",
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
    getDoctorPersonalDetails: (state, actions) => {
      const { speciality } = actions.payload;
      const { username, hospitalId } = getUserDetails();
      state.speciality = speciality;
      state.username = username;
      state.hospitalId = hospitalId;
    },
  },
});

export default doctor.reducer;

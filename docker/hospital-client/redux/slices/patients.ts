import { createSlice } from "@reduxjs/toolkit";
import { getUserDetails } from "../utils/cookies";
import { patientPersonalDetails } from "@/utils/patients";

export const patient = createSlice({
  name: "patient",
  initialState: {
    loading: true,
    error: "",
    username: getUserDetails().username || "",
    role: getUserDetails().role || "",
    patientPersonalDetails: patientPersonalDetails,
    patientHistory: [],
    doctorsByHospital: [],
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
    getPatientPersonalDetails: (state, actions) => {
      const { username, hospitalId } = getUserDetails();
      state.username = username;
      state.hospitalId = hospitalId;
      state.patientPersonalDetails = actions.payload;
    },
  },
});

export default patient.reducer;

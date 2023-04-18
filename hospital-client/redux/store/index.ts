import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/auth";
import doctorReducer from "../slices/doctor";
import adminReducer from "../slices/admin";
import patientsReducer from "../slices/patients";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    auth: authReducer,
    doctor: doctorReducer,
    admin: adminReducer,
    patient: patientsReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

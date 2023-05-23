const doctorDesignation = [
  "Cardiologist",
  "Neurologist",
  "Oncologist",
  "Psychiatrist",
  "Dermatologist",
  "Orthopedic Surgeon",
  "Pediatrician",
  "Gynecologist",
  "General Practitioner",
];

export const HOSPITAL_LIST = [
  {
    label: "Hospital-1",
    value: "1",
  },
  {
    label: "Hospital-2",
    value: "2",
  },
];

export const ROLE_LIST = [
  {
    label: "Admin",
    value: "admin",
  },
  {
    label: "Patient",
    value: "patient",
  },
  {
    label: "Doctor",
    value: "doctor",
  },
];

const bloodGroupOptions = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const BLOOD_GROUP = bloodGroupOptions.map((value) => ({
  label: value,
  value: value,
}));
export const DOCTOR_DESIGNATION = doctorDesignation.map((value) => ({
  label: value,
  value: value,
}));

export const DOCTOR_FIELDS = [
  "username",
  "password",
  "hospitalId",
  "speciality",
];

export const PATIENT_FIELDS = [
  "username",
  "password",
  "hospitalId",
  "age",
  "bloodGroup",
  "phoneNumber",
  "address",
];

export const USER_CREDETIALS = ["username", "password", "role"];

export const API_BASE_URL = "http://localhost:3001";

export const ROLE_PATIENT = "patient";

export const ROLE_DOCTOR = "doctor";

export const ROLE_ADMIN = "admin";

export const SAMPLE_SALT = "$2a$10$4vJ4X9gYcu5CJU5y6wnSue";

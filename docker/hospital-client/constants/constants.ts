export const DOCTOR_DESIGNATION = [
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
    name: "Hospital-1",
    value: "1",
  },
  {
    name: "Hospital-2",
    value: "2",
  },
];

export const BLOOD_GROUP = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

// const BLOOD_GROUPS = [
//   "O positive",
//   "O negative",
//   "A positive",
//   "A negative",
//   "B positive",
//   "B negative",
//   "AB positive",
//   "AB negative",
// ];

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

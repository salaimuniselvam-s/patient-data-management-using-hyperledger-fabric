import * as Yup from "yup";

export const UpdatePatientDetailsSchema = Yup.object().shape({
  age: Yup.number()
    .positive("Age must be a positive number")
    .max(149, "Age must be below 150")
    .required("Age is Required"),
  bloodGroup: Yup.string().required("Blood Group is Required"),
  phoneNumber: Yup.string()
    .matches(/^[\d+ -]+$/, "Phone number is not valid")
    .required("Phone number is required"),
  emergPhoneNumber: Yup.string().matches(
    /^[\d+ -]+$/,
    "Phone number is not valid"
  ),
  address: Yup.string().required("Address is Required"),
});

export const RegisterAsPatientSchema = Yup.object().shape({
  username: Yup.string().required("Username is Required"),
  password: Yup.string().required("Password is Required"),
  // .min(8, "Password must be at least 8 characters")
  // .matches(
  //   /(?=.*[!@#$%^&*])/,
  //   "Password must contain at least one special character"
  // ),
  hospitalId: Yup.string().required("Hospital is Required"),
  age: Yup.number()
    .positive("Age must be a positive number")
    .max(149, "Age must be below 150")
    .required("Age is Required"),
  bloodGroup: Yup.string().required("Blood Group is Required"),
  phoneNumber: Yup.string()
    .matches(/^[\d+ -]+$/, "Phone number is not valid")
    .required("Phone number is required"),
  address: Yup.string().required("Address is Required"),
});

export const updatePatientPersonalDetails = {
  username: "",
  age: "",
  bloodGroup: "",
  phoneNumber: "",
  address: "",
};

export const RegisterPatientInitialValues = {
  ...updatePatientPersonalDetails,
  password: "",
  hospitalId: "",
};

export const patientPersonalDetails = {
  patientId: "",
  firstName: "",
  lastName: "",
  age: "",
  phoneNumber: "",
  emergPhoneNumber: "",
  address: "",
  bloodGroup: "",
  allergies: "",
  symptoms: "",
  diagnosis: "",
  treatment: "",
  followUp: "",
  permissionGranted: [""],
};

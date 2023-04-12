import * as Yup from "yup";

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
  address: Yup.number().required("Address is Required"),
});

export const RegisterPatientInitialValues = {
  username: "",
  password: "",
  hospitalId: "",
  age: "",
  bloodGroup: "",
  phoneNumber: "",
  address: "",
};

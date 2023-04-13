import * as Yup from "yup";

export const DoctorRegistrationInitialValues = {
  username: "",
  password: "",
  hospitalId: "",
  speciality: "",
};

export const DoctorValidationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is Required"),
  // .min(8, "Password must be at least 8 characters")
  // .matches(
  //   /(?=.*[!@#$%^&*])/,
  //   "Password must contain at least one special character"
  // ),
  hospitalId: Yup.string().required("Hospital is required"),
  speciality: Yup.string().required("Speciality is required"),
});

const doctorImage = [
  "/doctor1.jpg",
  "/doctor2.avif",
  "/DoctorProfilePicture.avif",
];

export const doctorProfilePicture = (index: number, hospitalId: string) => {
  const imgIndex = (index + parseInt(hospitalId) || 0) % doctorImage.length;
  return doctorImage[imgIndex];
};

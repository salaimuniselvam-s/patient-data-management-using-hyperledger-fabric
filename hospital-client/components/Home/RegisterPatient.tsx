import {
  BLOOD_GROUP,
  HOSPITAL_LIST,
  ROLE_PATIENT,
} from "@/constants/constants";
import { registerUser } from "@/redux/actions/authActions";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { PatientRegistrationFields } from "@/types/patient";
import { redirectToProfilePage } from "@/utils/routeUtils";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  RegisterAsPatientSchema,
  RegisterPatientInitialValues,
} from "@/utils/patients";
import SelectField from "../Helper/FormSelect";

const RegisterPatient = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const authState = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (authState.loggedIn) router.push(redirectToProfilePage(authState.role));
    setIsSubmitting(authState.loading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState]);

  const RegisterAsPatient = (patientDetails: PatientRegistrationFields) => {
    dispatch(registerUser({ role: ROLE_PATIENT, details: patientDetails }));
  };

  return (
    <div className="flex  max-w-7xl mx-auto justify-center mt-8">
      <div className="min-w-[60%] bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md  xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Register as Patient
          </h1>
          <Formik
            initialValues={RegisterPatientInitialValues}
            onSubmit={RegisterAsPatient}
            validationSchema={RegisterAsPatientSchema}
          >
            {() => (
              <Form className="space-y-4 md:space-y-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="w-full sm:w-1/2">
                    <label
                      htmlFor="username"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Username
                    </label>
                    <Field
                      type="text"
                      name="username"
                      id="username"
                      className={`border-gray-300 bg-gray-50 border text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none`}
                      placeholder="Rajesh"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="w-full sm:w-1/2 relative">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className={`border-gray-300 bg-gray-50 border text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none`}
                    />
                    <span
                      className={`fas ${
                        showPassword ? "fa-eye-slash " : "fa-eye"
                      } absolute inset-y-0 right-0 pr-5 flex items-center justify-center pt-10 cursor-pointer focus:outline-none`}
                      onClick={() => setShowPassword(!showPassword)}
                    ></span>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>
                <div className="flex flex-col  sm:flex-row gap-6">
                  <div className="w-full sm:w-1/2">
                    <label
                      htmlFor="hospitalId"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Hospital
                    </label>
                    <Field
                      name="hospitalId"
                      placeholder="Select Hospital"
                      component={SelectField}
                      options={HOSPITAL_LIST}
                    />

                    <ErrorMessage
                      name="hospitalId"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label
                      htmlFor="age"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Age
                    </label>
                    <Field
                      type="number"
                      name="age"
                      id="age"
                      placeholder="54"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                    />
                    <ErrorMessage
                      name="age"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>
                <div className="flex flex-col  sm:flex-row gap-6">
                  <div className="w-full sm:w-1/2">
                    <label
                      htmlFor="bloodGroup"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Blood Group
                    </label>
                    <Field
                      name="bloodGroup"
                      placeholder="Select your Blood Group"
                      component={SelectField}
                      options={BLOOD_GROUP}
                    />
                    <ErrorMessage
                      name="bloodGroup"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label
                      htmlFor="phoneNumber"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Phone Number
                    </label>
                    <Field
                      type="tel"
                      name="phoneNumber"
                      id="phoneNumber"
                      placeholder="7708216211"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                    />
                    <ErrorMessage
                      name="phoneNumber"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Address
                  </label>
                  <Field
                    type="text"
                    name="address"
                    id="address"
                    placeholder="71A,East New Street,Srivilliputtur"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <button
                  type="submit"
                  disabled={authState.loading}
                  className="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {isSubmitting ? "Registering.." : "Register"}
                </button>
                <div className="flex flex-col justify-between items-center  sm:flex-row flex-row-at-1100">
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400 ">
                    Want To Register as Doctor ?{" "}
                    <Link
                      href="/register-doctor"
                      className="font-medium ml-1 text-primary hover:underline dark:text-primary cursor-pointer"
                    >
                      Click Here
                    </Link>
                  </p>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400 ">
                    Already Have an Account ?{" "}
                    <Link
                      href="/login"
                      className="font-medium ml-1 text-primary hover:underline dark:text-primary cursor-pointer"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default RegisterPatient;

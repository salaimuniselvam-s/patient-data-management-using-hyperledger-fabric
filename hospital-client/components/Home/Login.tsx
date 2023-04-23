import { logInUser } from "@/redux/actions/authActions";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { UserCredentialsFields } from "@/types/auth";
import { redirectToProfilePage } from "@/utils/routeUtils";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import SelectField from "../Helper/FormSelect";
import { ROLE_LIST } from "@/constants/constants";

const Login = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const authState = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (authState.loggedIn) router.push(redirectToProfilePage(authState.role));
    setIsSubmitting(authState.loading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState]);

  const initialValues = {
    username: "",
    password: "",
    role: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    role: Yup.string().required("Role is required"),
  });

  const onSubmit = (userDetails: UserCredentialsFields) => {
    dispatch(logInUser(userDetails));
  };

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  return (
    <div className="flex max-w-7xl mx-auto justify-center mt-16">
      <div className="min-w-[50%] bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md  xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign in to your account
          </h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {() => (
              <Form className="space-y-4 md:space-y-6">
                <div>
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                    placeholder="Rajesh"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="relative">
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                  />
                  <span
                    className={`fas ${
                      showPassword ? "fa-eye-slash " : "fa-eye"
                    } absolute inset-y-0 right-0 pr-5 flex items-center justify-center pt-10 cursor-pointer focus:outline-none`}
                    onClick={togglePasswordVisibility}
                  ></span>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="role"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Role
                  </label>
                  <Field
                    name="role"
                    placeholder="Select Your Role"
                    component={SelectField}
                    options={ROLE_LIST}
                  />
                  <ErrorMessage
                    name="role"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    {isSubmitting ? "Signing In.." : "Sign in"}
                  </button>
                  <p className="text-sm mt-2 font-light text-gray-500 dark:text-gray-400 float-right pb-6">
                    Don’t have an account yet?{" "}
                    <Link
                      href="/register-patient"
                      className="font-medium ml-1 text-primary hover:underline dark:text-primary cursor-pointer"
                    >
                      Sign up
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

export default Login;

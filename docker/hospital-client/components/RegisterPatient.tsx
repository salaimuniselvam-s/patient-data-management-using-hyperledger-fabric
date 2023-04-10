import { BLOOD_GROUP, HOSPITAL_LIST } from "@/constants/constants";
import Link from "next/link";
import React, { FormEvent, useState } from "react";

const RegisterPatient = () => {
  const [showPassword, setShowPassword] = useState(false);

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  const RegisterAsPatient = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    console.log(formData);
  };
  return (
    <div className="flex justify-center mt-8">
      <div className="min-w-[60%] bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md  xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Register as Patient
          </h1>
          <form
            className="space-y-4  md:space-y-6"
            onSubmit={RegisterAsPatient}
          >
            <div className="flex flex-col  sm:flex-row gap-6">
              <div className="w-full sm:w-1/2">
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="username"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Rajesh"
                  required={true}
                />
              </div>
              <div className="w-full sm:w-1/2 relative">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                />
                <span
                  className={`fas ${
                    showPassword ? "fa-eye-slash" : "fa-eye"
                  } absolute inset-y-0 right-0 pr-5 flex items-center justify-center pt-10 cursor-pointer focus:outline-none`}
                  onClick={togglePasswordVisibility}
                ></span>
              </div>
            </div>

            <div className="flex flex-col  sm:flex-row gap-6">
              <div className="w-full sm:w-1/2">
                <label
                  htmlFor="hospitals"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Hospital
                </label>
                <select
                  name="hospitals"
                  id="hospitals"
                  required={true}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option
                    className="text-gray-300"
                    value=""
                    disabled
                    selected
                    hidden
                  >
                    Hopsital Under You Want To Register
                  </option>
                  {HOSPITAL_LIST.map((hospital, index) => (
                    <option value={hospital.value} key={index}>
                      {hospital.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full sm:w-1/2">
                <label
                  htmlFor="age"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  placeholder="54"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                />
              </div>
            </div>
            <div className="flex flex-col  sm:flex-row gap-6">
              <div className="w-full sm:w-1/2">
                <label
                  htmlFor="bloodgroup"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Blood Group
                </label>
                <select
                  name="bloodgroup"
                  id="bloodgroup"
                  required={true}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option
                    className="text-gray-300"
                    value=""
                    disabled
                    selected
                    hidden
                  >
                    Select Your Blood group
                  </option>
                  {BLOOD_GROUP.map((group, index) => (
                    <option value={group} key={index}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full sm:w-1/2">
                <label
                  htmlFor="phoneno"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone Number
                </label>
                <input
                  type="number"
                  name="phoneno"
                  id="phoneno"
                  placeholder="7708216211"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
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
              <input
                type="text"
                name="address"
                id="address"
                placeholder="71A,East New Street,Srivilliputtur"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required={true}
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Register
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPatient;

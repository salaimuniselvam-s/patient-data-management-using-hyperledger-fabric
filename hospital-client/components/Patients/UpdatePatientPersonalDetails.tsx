import { API_BASE_URL, BLOOD_GROUP } from "@/constants/constants";
import { useAppDispatch } from "@/redux/store";
import {
  PatientPersonalDetails,
  PatientUpdatePersonalDetails,
} from "@/types/patient";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { UpdatePatientDetailsSchema } from "@/utils/patients";
import { toast } from "react-toastify";
import axiosInstance from "@/redux/axios/axiosInterceptor";
import { getPatientPersonalDetails } from "@/redux/actions/patientActions";
import SelectField from "@/components/Helper/FormSelect";

type patientDetail = {
  patientDetail: PatientPersonalDetails;
  closeModal: () => void;
};
const UpdatePatientPersonalDetail: React.FC<patientDetail> = ({
  patientDetail,
  closeModal,
}) => {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const UpdateDetails = async (
    patientDetails: PatientUpdatePersonalDetails
  ) => {
    setIsSubmitting(true);
    try {
      toast.loading("Updating Records..");
      await axiosInstance.patch(
        `${API_BASE_URL}/patients/${patientDetail.patientId}/update/personaldetails`,
        patientDetails
      );

      dispatch(getPatientPersonalDetails(patientDetail.patientId));

      closeModal();
      toast.dismiss();
      toast.success("Successfully Updated Details..");
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error("Updating Details Failed. Please Try Again..");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="bg-white rounded-lg shadow dark:border md:mt-0  xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-lg font-semibold leading-tight tracking-tight text-gray-900  dark:text-white">
            <i className="fas fa-pencil-alt mr-2"></i>
            Update Details
          </h1>
          <Formik
            initialValues={patientDetail}
            onSubmit={UpdateDetails}
            validationSchema={UpdatePatientDetailsSchema}
          >
            {() => (
              <Form className="space-y-4 md:space-y-6">
                <div className="flex flex-col  sm:flex-row gap-6">
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
                </div>
                <div className="flex flex-col  sm:flex-row gap-6">
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
                  <div className="w-full sm:w-1/2">
                    <label
                      htmlFor="emergPhoneNumber"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Emergency Phone Number
                    </label>
                    <Field
                      type="tel"
                      name="emergPhoneNumber"
                      id="phoneNumber"
                      placeholder="7708216211"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                    />
                    <ErrorMessage
                      name="emergPhoneNumber"
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
                  // disabled={authState.loading}
                  className="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {isSubmitting ? "Updating.." : "Update"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default UpdatePatientPersonalDetail;

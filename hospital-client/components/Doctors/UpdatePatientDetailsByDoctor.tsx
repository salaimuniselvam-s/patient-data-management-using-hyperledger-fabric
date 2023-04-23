import { API_BASE_URL } from "@/constants/constants";
import { useAppDispatch } from "@/redux/store";
import {
  DoctorUpdatePatientRecords,
  PatientDetailsUpdateByDoctor,
} from "@/types/patient";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import axiosInstance from "@/redux/axios/axiosInterceptor";
import { getPatientsUnderDoctor } from "@/redux/actions/doctorActions";

type patientDetail = {
  patientDetail: PatientDetailsUpdateByDoctor;
  closeModal: () => void;
};
const UpdatePatientDetailsByDoctor: React.FC<patientDetail> = ({
  patientDetail,
  closeModal,
}) => {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const UpdateDetails = async (patientDetails: DoctorUpdatePatientRecords) => {
    setIsSubmitting(true);
    try {
      toast.loading("Updating Records..");
      await axiosInstance.patch(
        `${API_BASE_URL}/doctors/patients/${patientDetail.patientId}/details/medical`,
        patientDetails
      );

      dispatch(getPatientsUnderDoctor());
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
    <div className="flex  justify-center mt-8">
      <div className="bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md  xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-lg font-semibold leading-tight tracking-tight text-gray-900  dark:text-white">
            <i className="fas fa-pencil-alt mr-2"></i>
            Update Details
          </h1>
          <Formik initialValues={patientDetail} onSubmit={UpdateDetails}>
            {() => (
              <Form className="space-y-4 md:space-y-6">
                <div className="flex flex-col  sm:flex-row gap-6">
                  <div className="w-full sm:w-1/2">
                    <label
                      htmlFor="symptoms"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Symptoms
                    </label>
                    <Field
                      type="text"
                      name="symptoms"
                      id="symptoms"
                      placeholder=""
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                    />
                    <ErrorMessage
                      name="symptoms"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label
                      htmlFor="diagnosis"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Diagnosis
                    </label>
                    <Field
                      type="text"
                      name="diagnosis"
                      id="diagnosis"
                      placeholder=""
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                    />
                    <ErrorMessage
                      name="diagnosis"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>
                <div className="flex flex-col  sm:flex-row gap-6">
                  <div className="w-full sm:w-1/2">
                    <label
                      htmlFor="treatment"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Treatment
                    </label>
                    <Field
                      type="text"
                      name="treatment"
                      id="treatment"
                      placeholder=""
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                    />
                    <ErrorMessage
                      name="treatment"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label
                      htmlFor="followUp"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Follow Up
                    </label>
                    <Field
                      type="text"
                      name="followUp"
                      id="followUp"
                      placeholder=""
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                    />
                    <ErrorMessage
                      name="followUp"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
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

export default UpdatePatientDetailsByDoctor;

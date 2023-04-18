import { PatientDetailsUpdateByDoctor } from "@/types/patient";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import React, { Fragment, useState } from "react";
import UpdatePatientDetailsByDoctor from "./UpdatePatientDetailsByDoctor";
import PatientHistoryRecords from "./PatientHistoryRecords";
import { useAppDispatch } from "@/redux/store";
import FormInputReadonly from "../Helper/FormInputReadonly";
import { getUserDetails } from "@/redux/utils/cookies";
import { generateUserProfilePicture } from "@/utils/generateUserProfilePicture";

const PatientsUnderDoctor: React.FC<{
  patientDetail: PatientDetailsUpdateByDoctor;
}> = ({ patientDetail }) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const closeModal = () => setIsOpen(false);

  const openModal = () => setIsOpen(true);

  const closeHistoryModal = () => {
    dispatch({
      type: "doctor/getPatientHistory",
      payload: [],
    });
    setIsHistoryOpen(false);
  };

  const openHistoryModal = () => {
    setIsHistoryOpen(true);
  };

  return (
    <>
      <div className="flex justify-center items-center mt-6">
        <div className="max-w-7xl mx-auto  px-2 pb-6 sm:px-4 lg:px-4 bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
          <div className="px-6 py-4">
            <div className="flex justify-between  flex-col sm:flex-row">
              <div className="flex  mb-4">
                <Image
                  className=" w-16 h-16 rounded-full shadow-lg"
                  src={generateUserProfilePicture(getUserDetails().username)}
                  width={720}
                  height={720}
                  alt="Doctor Profile Image"
                />
                <div className="font-semibold pl-3 pt-1 text-xl">
                  {patientDetail.patientId}
                  <span className="dark:text-gray-300 block font-normal text-lg">
                    patient
                  </span>
                </div>
              </div>
              <div className="mb-8 sm:mb-4 flex flex-col justify-center gap-3 sm:block">
                <button
                  onClick={openHistoryModal}
                  className=" text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  View History
                </button>
                <button
                  onClick={openModal}
                  className="sm:ml-4 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Update Details
                </button>
              </div>
            </div>
            <div className="flex  justify-center gap-12 flex-col sm:flex-row">
              <div className="sm:w-1/2 min-w-fit flex flex-col gap-6">
                <FormInputReadonly
                  id="Blood Group"
                  icon="fas fa-tint"
                  value={patientDetail.bloodGroup}
                />
                <FormInputReadonly
                  id="Treatment"
                  icon="fas fa-medkit"
                  value={patientDetail.treatment}
                />
                <FormInputReadonly
                  id="Follow Up"
                  icon="fas fa-calendar-check"
                  value={patientDetail.followUp}
                />
              </div>
              <div className="sm:w-1/2 min-w-fit  flex flex-col gap-6">
                <FormInputReadonly
                  id="Allergies"
                  icon="fas fa-allergies"
                  value={patientDetail.allergies}
                />
                <FormInputReadonly
                  id="Symptoms"
                  icon="fas fa-thermometer-half"
                  value={patientDetail.symptoms}
                />
                <FormInputReadonly
                  id="Diagnosis"
                  icon="fas fa-stethoscope"
                  value={patientDetail.diagnosis}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="  overflow-hidden transform  rounded-2xl  text-left shadow-xl transition-all">
                  <UpdatePatientDetailsByDoctor
                    patientDetail={patientDetail}
                    closeModal={closeModal}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={isHistoryOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeHistoryModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="transform  rounded-2xl text-left shadow-xl transition-all m-3 overflow-auto">
                  <PatientHistoryRecords patientId={patientDetail.patientId} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default PatientsUnderDoctor;

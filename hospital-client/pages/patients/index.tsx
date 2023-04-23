import { withAuth } from "@/components/Auth";
import { Dialog, Transition } from "@headlessui/react";
import { getPatientPersonalDetails } from "@/redux/actions/patientActions";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getUserDetails } from "@/redux/utils/cookies";
import { patientPersonalDetails } from "@/utils/patients";
import { useEffect, useState, Fragment } from "react";
import UpdatePatientPersonalDetail from "@/components/Patients/UpdatePatientPersonalDetails";
import Loader from "@/components/Helper/Loader";
import FormInputReadonly from "@/components/Helper/FormInputReadonly";
import { GenerateAvatarHeader } from "@/utils/GenerateAvatar";

// Profile Page for Patients
function PatientProfilePage() {
  const patientDetails = useAppSelector((state) => state.patient);
  const [patientDetail, setPatientDetail] = useState(patientPersonalDetails);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    dispatch(getPatientPersonalDetails(getUserDetails().username));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPatientDetail({ ...patientDetails.patientPersonalDetails });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientDetails]);

  if (patientDetails.loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex max-w-7xl mx-auto justify-center items-center mt-6">
        <div className="md:min-w-[60%]  2xl:min-w-900 px-4 pb-2 sm:px-6 lg:px-8 bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
          <div className="px-6  py-4">
            <div className="flex justify-between  flex-col md:flex-row">
              <div className="flex  mb-4">
                <GenerateAvatarHeader role={getUserDetails().role} />
                <div className="font-semibold pl-3 pt-2 text-xl">
                  {patientDetail.patientId}
                  <span className="dark:text-gray-300 block font-normal text-lg">
                    patient
                  </span>
                </div>
              </div>
              <div className="mb-4">
                <button
                  onClick={openModal}
                  className="w-full pt-2 text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Update Details
                </button>
              </div>
            </div>
            <div className="flex mt-3  justify-center gap-6 flex-col md:flex-row">
              <div className="md:w-1/2  flex flex-col gap-6">
                <FormInputReadonly
                  id="Age"
                  icon="fas fa-birthday-cake"
                  value={patientDetail.age}
                />
                <FormInputReadonly
                  id="Phone Number"
                  icon="fas fa-phone"
                  value={patientDetail.phoneNumber}
                />
                <FormInputReadonly
                  id="Address"
                  icon="fas fa-map-marker-alt"
                  value={patientDetail.address}
                />
                <FormInputReadonly
                  id="Symptoms"
                  icon="fas fa-thermometer-half"
                  value={patientDetail.symptoms}
                />
                <FormInputReadonly
                  id="Treatment"
                  icon="fas fa-medkit"
                  value={patientDetail.treatment}
                />
              </div>
              <div className="md:w-1/2   flex flex-col gap-6">
                <FormInputReadonly
                  id="Blood Group"
                  icon="fas fa-tint"
                  value={patientDetail.bloodGroup}
                />
                <FormInputReadonly
                  id="Emergency Phone Number"
                  icon="fas fa-exclamation-triangle"
                  value={patientDetail.emergPhoneNumber}
                />
                <FormInputReadonly
                  id="Allergies"
                  icon="fas fa-allergies"
                  value={patientDetail.allergies}
                />

                <FormInputReadonly
                  id="Diagnosis"
                  icon="fas fa-stethoscope"
                  value={patientDetail.diagnosis}
                />
                <FormInputReadonly
                  id="Follow Up"
                  icon="fas fa-calendar-check"
                  value={patientDetail.followUp}
                />
              </div>
            </div>
            <div className="pt-6 w-full">
              <FormInputReadonly
                id="Access Granted To"
                icon="fas fa-user-check"
                value={patientDetail.permissionGranted}
              />
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
                <Dialog.Panel className="  overflow-hidden transform  rounded-2xl px-4 pb-6 sm:px-6 lg:px-8  p-6 text-left shadow-xl transition-all ">
                  <UpdatePatientPersonalDetail
                    patientDetail={patientDetail}
                    closeModal={closeModal}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default withAuth(PatientProfilePage);

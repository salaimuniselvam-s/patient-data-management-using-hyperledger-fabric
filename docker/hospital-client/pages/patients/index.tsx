import { withAuth } from "@/components/Auth";
import { Dialog, Transition } from "@headlessui/react";
import { getPatientPersonalDetailsAction } from "@/redux/actions/patientActions";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getUserDetails } from "@/redux/utils/cookies";
import { patientPersonalDetails } from "@/utils/patients";
import Image from "next/image";
import { useEffect, useState, Fragment } from "react";
import UpdatePatientPersonalDetail from "@/components/UpdatePatientPersonalDetails";

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
    dispatch(getPatientPersonalDetailsAction(getUserDetails().username));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPatientDetail({ ...patientDetails.patientPersonalDetails });
  }, [patientDetails]);

  return (
    <>
      <div className="flex  justify-center items-center mt-6">
        <div className="max-w-7xl  px-4 pb-6 sm:px-6 lg:px-8 bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
          <div className="px-6 py-4">
            <div className="flex justify-between  flex-col sm:flex-row">
              <div className="flex  mb-4">
                <Image
                  className=" w-16 h-16 rounded-full shadow-lg"
                  src={"/Doctors.png"}
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
              <div className="mb-4">
                <button
                  onClick={openModal}
                  className="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Update Details
                </button>
              </div>
            </div>
            <div className="flex  justify-center gap-12 flex-col sm:flex-row">
              <div className="sm:w-1/2 min-w-fit flex flex-col gap-6">
                <p className=" text-base flex flex-wrap items-center ">
                  <i className="fas fa-birthday-cake mr-2"></i>
                  <span className=" text-lg">Age:</span>
                  <span className="ml-2">{patientDetail.age}</span>
                </p>
                <p className=" text-base flex flex-wrap items-center">
                  <i className="fas fa-phone mr-2"></i>
                  <span className=" text-lg">Phone:</span>
                  <span className="ml-2">{patientDetail.phoneNumber}</span>
                </p>

                <p className=" text-base flex flex-wrap items-center">
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  <span className=" text-lg">Address:</span>
                  <span className="ml-2">{patientDetail.address}</span>
                </p>
                <p className=" text-base flex flex-wrap items-center">
                  <i className="fas fa-notes-medical mr-2"></i>
                  <span className=" text-lg">Symptoms:</span>
                  <span className="ml-2">{patientDetail.symptoms}</span>
                </p>

                <p className=" text-base flex flex-wrap items-center">
                  <i className="fas fa-notes-medical mr-2"></i>
                  <span className=" text-lg">Treatment:</span>
                  <span className="ml-2">{patientDetail.treatment}</span>
                </p>
              </div>
              <div className="sm:w-1/2 min-w-fit  flex flex-col gap-6">
                <p className=" text-base flex flex-wrap items-center">
                  <i className="fas fa-tint mr-2"></i>
                  <span className=" text-lg">Blood Group:</span>
                  <span className="ml-2">{patientDetail.bloodGroup}</span>
                </p>

                <p className=" text-base flex flex-wrap items-center">
                  <i className="fas fa-exclamation-triangle mr-2"></i>
                  <span className=" text-lg">Emergency Phone:</span>
                  <span className="ml-2">{patientDetail.emergPhoneNumber}</span>
                </p>

                <p className=" text-base flex flex-wrap  items-center">
                  <i className="fas fa-allergies mr-2"></i>
                  <span className="text-lg">Allergies:</span>
                  <span className="ml-2">{patientDetail.allergies}</span>
                </p>
                <p className=" text-base flex flex-wrap  items-center">
                  <i className="fas fa-notes-medical mr-2"></i>
                  <span className="text-lg">Diagnosis:</span>
                  <span className="ml-2">{patientDetail.diagnosis}</span>
                </p>

                <p className=" text-base flex flex-wrap items-center">
                  <i className="fas fa-notes-medical mr-2"></i>
                  <span className="text-lg">Follow Up:</span>
                  <span className="ml-2">{patientDetail.followUp}</span>
                </p>
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
                <Dialog.Panel className="  overflow-hidden transform  rounded-2xl px-4 pb-6 sm:px-6 lg:px-8  p-6 text-left shadow-xl transition-all">
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

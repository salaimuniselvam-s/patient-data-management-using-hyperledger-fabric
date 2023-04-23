import Doctor_Admin_ProfileCard from "@/components/Admin/Doctor_Admin_ProfileCard";
import { API_BASE_URL } from "@/constants/constants";
import axiosInstance from "@/redux/axios/axiosInterceptor";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { doctorProfilePicture } from "@/utils/doctors";
import { useRouter } from "next/router";
import React, { useEffect, Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-toastify";
import { getUserDetails } from "@/redux/utils/cookies";
import { getPatientPersonalDetails } from "@/redux/actions/patientActions";
import Loader from "@/components/Helper/Loader";
import { withAuth } from "@/components/Auth";

type DoctorDetails = {
  id: string;
  speciality: string;
};

const DoctorByHospital = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const slug = Array.isArray(router.query.slug)
    ? router.query.slug[0]
    : router.query.slug;
  const [doctorDetail, setDoctorDetail] = useState([
    {
      username: "",
      hospitalId: "",
      speciality: "",
    },
  ]);
  const [isFetching, setIsFetching] = useState(true);
  const [isAccessInProcess, setIsAccessInProcess] = useState(false);
  const patientDetails = useAppSelector((state) => state.patient);
  const [confirmText, setConfirmText] = useState("");
  const [doctor, setDoctor] = useState("");
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  const fetchDoctors = async (hospitalId: string) => {
    setIsFetching(true);
    try {
      const response = await axiosInstance.get(
        `${API_BASE_URL}/patients/doctors/${hospitalId}/_all`
      );
      const doctors = response.data.map((data: DoctorDetails) => {
        return {
          username: data.id,
          hospitalId,
          speciality: data.speciality,
        };
      });
      setDoctorDetail(doctors);
    } catch (error) {
      setDoctorDetail([]);
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchDoctors(slug || "");
  }, [slug]);

  const AccessControl = (isAccessGranted: boolean, username: string) => {
    const confirm = isAccessGranted
      ? `Revoke Access from ${username}`
      : `Grant Access to ${username}`;
    setIsOpen(true);
    setDoctor(username);
    setConfirmText(confirm);
  };

  const AuthorizingAccess = async () => {
    setIsAccessInProcess(true);
    const grant = confirmText.includes("Grant Access") ? true : false;
    try {
      toast.loading(`${grant ? "Granting" : "Revoking"} Access...`);
      await axiosInstance.patch(
        `${API_BASE_URL}/patients/${getUserDetails().username}/${
          grant ? "grant" : "revoke"
        }/${doctor}`
      );
      fetchDoctors(slug || "");
      dispatch(getPatientPersonalDetails(getUserDetails().username));
      toast.dismiss();
      toast.success(`Access ${grant ? "Granted" : "Revoked"} Successfully.`);
    } catch (error) {
      toast.dismiss();
      toast.error(
        `${grant ? "Granting" : "Revoking"} Access Failed. Please Try Again.`
      );
      console.error(error);
    } finally {
      setIsAccessInProcess(false);
      closeModal();
    }
  };

  if (isFetching) {
    return <Loader />;
  }

  return (
    <div className="max-w-7xl mx-auto flex flex-wrap flex-col sm:flex-row gap-6 px-6">
      {doctorDetail.map((doctorDetail, index: number) => {
        return (
          <Doctor_Admin_ProfileCard
            imgSrc={doctorProfilePicture(index, slug || "1")}
            {...doctorDetail}
            key={index}
            isPatient={true}
            AccessControl={AccessControl}
            isAccessGranted={patientDetails.patientPersonalDetails.permissionGranted.includes(
              doctorDetail.username
            )}
          />
        );
      })}
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-100 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Are You Sure To {confirmText} ?
                  </Dialog.Title>

                  <div className="mt-6 float-right">
                    <button
                      type="button"
                      disabled={isAccessInProcess}
                      className="inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium  focus:outline-none focus-visible:ring-2 bg-red-500 hover:bg-red-600 text-white    focus-visible:ring-offset-2 mr-2"
                      onClick={closeModal}
                    >
                      No
                    </button>
                    <button
                      type="button"
                      disabled={isAccessInProcess}
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-500 hover:bg-green-600 text-white px-4 py-2 text-sm font-medium   focus:outline-none focus-visible:ring-2  focus-visible:ring-offset-2"
                      onClick={AuthorizingAccess}
                    >
                      Yes
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default withAuth(DoctorByHospital);

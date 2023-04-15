import { withAuth } from "@/components/Auth";
import Loader from "@/components/Helper/Loader";
import PatientsUnderDoctor from "@/components/Doctors/PatientsUnderDoctor";
import { getPatientsUnderDoctorAction } from "@/redux/actions/doctorActions";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { PatientDetailsUpdateByDoctor } from "@/types/patient";
import React, { useEffect } from "react";

// List of Patients who given access to the doctors
const AuthorisedPatientsForDoctors = () => {
  const dispatch = useAppDispatch();
  const doctors = useAppSelector((state) => state.doctor);

  useEffect(() => {
    dispatch(getPatientsUnderDoctorAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (doctors.loading) return <Loader />;

  if (doctors.patients.length === 0)
    return (
      <div
        className="flex justify-center items-center font-bold text-xl mt-12"
        style={{ minHeight: "calc(100vh - 300px)" }}
      >
        No Patients Granted Access To You... !
      </div>
    );

  return (
    <div className="flex flex-wrap flex-col sm:flex-row mt-3 px-6 gap-6">
      {doctors.patients.map(
        (data: PatientDetailsUpdateByDoctor, index: number) => {
          return <PatientsUnderDoctor key={index} patientDetail={data} />;
        }
      )}
    </div>
  );
};

export default withAuth(AuthorisedPatientsForDoctors);

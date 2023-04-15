import { withAuth } from "@/components/Auth";
import Loader from "@/components/Helper/Loader";
import PatientCard from "@/components/Admin/PatientCard";
import { getAllPatientDetailsAction } from "@/redux/actions/adminActions";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import React, { useEffect } from "react";

const AllPatients = () => {
  const patientDetails = useAppSelector((state) => state.admin);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllPatientDetailsAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (patientDetails.loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-wrap flex-col sm:flex-row mt-3 px-6 gap-6">
      {patientDetails.patients.map((props, index: number) => {
        return <PatientCard patientDetails={props} key={index} />;
      })}
    </div>
  );
};

export default withAuth(AllPatients);

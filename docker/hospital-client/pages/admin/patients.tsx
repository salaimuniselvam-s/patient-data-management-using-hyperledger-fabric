import { getAllPatientDetailsAction } from "@/redux/actions/adminActions";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import React, { useEffect } from "react";

const AllPatients = () => {
  const patientDetails = useAppSelector((state) => state.admin.patients);
  const dispatch = useAppDispatch();
  console.log(patientDetails);

  useEffect(() => {
    dispatch(getAllPatientDetailsAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex flex-col justify-center gap-6 text-xl items-center mt-12">
      <h1>All Patients Page</h1>
      <p>List of All Patients ...!</p>
    </div>
  );
};

export default AllPatients;

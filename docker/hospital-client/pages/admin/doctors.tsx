import { getAllDoctorsDetailsAction } from "@/redux/actions/adminActions";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import React, { useEffect } from "react";

const AllDoctors = () => {
  const doctorDetails = useAppSelector((state) => state.admin.doctors);
  const dispatch = useAppDispatch();
  console.log(doctorDetails);

  useEffect(() => {
    dispatch(getAllDoctorsDetailsAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col justify-center gap-6 text-xl items-center mt-12">
      <h1>All Doctors Page</h1>
      <p>List of All Doctors ...!</p>
    </div>
  );
};

export default AllDoctors;

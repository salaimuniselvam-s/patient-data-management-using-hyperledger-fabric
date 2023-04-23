import { withAuth } from "@/components/Auth";
import Doctor_Admin_ProfileCard from "@/components/Admin/Doctor_Admin_ProfileCard";
import Loader from "@/components/Helper/Loader";
import { getAllDoctorsDetails } from "@/redux/actions/adminActions";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { doctorProfilePicture } from "@/utils/doctors";
import React, { useEffect } from "react";

const AllDoctors = () => {
  const doctorDetails = useAppSelector((state) => state.admin);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllDoctorsDetails());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (doctorDetails.loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-7xl mx-auto flex flex-wrap flex-col sm:flex-row mt-3 px-6 gap-6">
      {doctorDetails.doctors.map(
        (doctorDetail: { id: string; speciality: string }, index: number) => {
          return (
            <Doctor_Admin_ProfileCard
              imgSrc={doctorProfilePicture(index, `${index}`)}
              key={index}
              username={doctorDetail.id}
              speciality={doctorDetail.speciality}
              isAdmin={true}
            />
          );
        }
      )}
    </div>
  );
};

export default withAuth(AllDoctors);

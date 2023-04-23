import { withAuth } from "@/components/Auth";
import Doctor_Admin_ProfileCard from "@/components/Admin/Doctor_Admin_ProfileCard";
import Loader from "@/components/Helper/Loader";
import { getDoctorPersonalDetails } from "@/redux/actions/doctorActions";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";

// Profile Page for Doctors
function DoctorProfilePage() {
  const doctorDetails = useAppSelector((state) => state.doctor);
  const [doctorDetail, setDoctorDetail] = useState({
    username: "",
    speciality: "",
    hospitalId: "",
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDoctorPersonalDetails());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setDoctorDetail({
      username: doctorDetails.username,
      speciality: doctorDetails.speciality,
      hospitalId: doctorDetails.hospitalId,
    });
  }, [doctorDetails]);

  if (doctorDetails.loading) {
    return <Loader />;
  }

  return (
    <Doctor_Admin_ProfileCard
      imgSrc="/DoctorProfilePicture.avif"
      {...doctorDetail}
      isDoctor={true}
      isProfile={true}
    />
  );
}

export default withAuth(DoctorProfilePage);

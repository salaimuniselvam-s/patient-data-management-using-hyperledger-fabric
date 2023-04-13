import { withAuth } from "@/components/Auth";
import Doctor_Admin_ProfileCard from "@/components/Doctor_Admin_ProfileCard";
import { getDoctorDetailsAction } from "@/redux/actions/doctorActions";
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
    dispatch(getDoctorDetailsAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setDoctorDetail({
      username: doctorDetails.username,
      speciality: doctorDetails.speciality,
      hospitalId: doctorDetails.hospitalId,
    });
  }, [doctorDetails]);
  return (
    <Doctor_Admin_ProfileCard
      imgSrc="/DoctorProfilePicture.avif"
      {...doctorDetail}
      isPatient={false}
    />
  );
}

export default withAuth(DoctorProfilePage);
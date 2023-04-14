import { withAuth } from "@/components/Auth";
import HospitalCard from "@/components/HospitalCard";
import { HOSPITAL_LIST } from "@/utils/hospitalts";
import React from "react";

const Hospitals = () => {
  return (
    <div className="flex flex-wrap flex-col sm:flex-row mt-3 px-6 gap-6">
      {HOSPITAL_LIST.map((data, index: number) => {
        return <HospitalCard {...data} key={index} />;
      })}
    </div>
  );
};

export default withAuth(Hospitals);

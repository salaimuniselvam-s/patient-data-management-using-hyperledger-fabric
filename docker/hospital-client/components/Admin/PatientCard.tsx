import Image from "next/image";
import React from "react";
import bcrypt from "bcryptjs";
import { SAMPLE_SALT } from "@/constants/constants";

interface patient {
  patientId: string;
  phoneNumber: string;
  role: "patient";
}
const PatientCard: React.FC<{ patientDetails: patient }> = ({
  patientDetails,
}) => {
  return (
    <div className="flex mt-3 justify-center">
      <div className="w-full py-4 px-8 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col items-center">
          <Image
            className="rounded-full w-24 h-24"
            src={`https://www.gravatar.com/avatar/${bcrypt.hash(
              `${patientDetails.patientId}${patientDetails.phoneNumber}`,
              process.env.NEXT_PUBLIC_SALT || SAMPLE_SALT
            )}`}
            alt="User Profile"
            width={36}
            height={36}
          />
          <h5 className="mt-3 text-xl font-medium text-gray-900 dark:text-white">
            {patientDetails.patientId}
          </h5>
          <div className="flex items-center mt-1">
            <i className="fas fa-telephone dark:text-white text-black pr-3"></i>{" "}
            {patientDetails.phoneNumber}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientCard;

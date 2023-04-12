import Image from "next/image";
import React from "react";

interface profileCard {
  imgSrc: string;
  username: string;
  speciality: string;
  hospitalId: string;
}

const Doctor_Admin_ProfileCard = ({
  imgSrc,
  username,
  speciality,
  hospitalId,
}: profileCard) => {
  return (
    <div className="flex mt-12 justify-center">
      <div className="w-full p-8 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col items-center">
          <Image
            className="mb-6 w-64 h-60 rounded-full shadow-lg"
            src={imgSrc}
            width={720}
            height={720}
            alt="Doctor Profile Image"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {username}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {speciality}
          </span>
          <div className="flex items-center mt-6">
            <i className="fas fa-hospital dark:text-white text-black pr-3"></i>{" "}
            Hospital - {hospitalId}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctor_Admin_ProfileCard;

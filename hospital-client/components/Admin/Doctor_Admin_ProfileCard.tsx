import { GenerateAvatarHeader } from "@/utils/GenerateAvatar";
import Image from "next/image";
import React from "react";

interface profileCard {
  imgSrc: string;
  username: string;
  speciality: string;
  hospitalId?: string;
  isPatient?: boolean;
  isAccessGranted?: boolean;
  isDoctor?: boolean;
  isAdmin?: boolean;
  isProfile?: boolean;
  AccessControl?: (isAccessGranted: boolean, username: string) => void;
}

const Doctor_Admin_ProfileCard: React.FC<profileCard> = ({
  imgSrc,
  username,
  speciality,
  hospitalId,
  isPatient,
  isAccessGranted,
  AccessControl,
  isAdmin,
  isProfile,
  isDoctor,
}) => {
  return (
    <div className="flex mt-12 justify-center">
      <div className="sm:w-full p-4 md:p-8 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col items-center">
          {isProfile ? (
            <div className="mb-6">
              <GenerateAvatarHeader
                role={isDoctor ? "doctor" : isAdmin ? "admin" : "patient"}
                isProfile={isProfile}
              />
            </div>
          ) : (
            <Image
              className="mb-6 w-36 h-36 rounded-full shadow-lg"
              src={imgSrc}
              width={1080}
              height={1080}
              alt="Doctor Profile Image"
            />
          )}
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {username}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {speciality}
          </span>
          {isProfile && (
            <div className="flex items-center mt-3">
              <i className="fas fa-hospital dark:text-white text-black pr-3"></i>{" "}
              Hospital - {hospitalId}
            </div>
          )}
          {isPatient && (
            <div className="flex items-center mt-4">
              {!isAccessGranted ? (
                <button
                  onClick={() =>
                    AccessControl && AccessControl(!!isAccessGranted, username)
                  }
                  className="bg-green-700 hover:bg-green-800 text-white font-normal p-2 rounded"
                >
                  Grant Access
                </button>
              ) : (
                <button
                  onClick={() =>
                    AccessControl && AccessControl(!!isAccessGranted, username)
                  }
                  className="bg-red-700 hover:bg-red-800 text-white font-normal p-2 rounded flex items-center"
                >
                  Revoke Access
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctor_Admin_ProfileCard;

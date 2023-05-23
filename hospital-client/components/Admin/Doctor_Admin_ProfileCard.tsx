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
    <div
      className={`${isProfile && "lg:w-1/3 max-md:1/2"} flex justify-center`}
    >
      <div
        className={`${
          isProfile && "h-80"
        } p-8 md:p-2 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700`}
      >
        <div
          className={`${
            isProfile ? "flex-col" : "flex-row"
          } flex items-center mx-6 py-1`}
        >
          {isProfile ? (
            <div>
              <GenerateAvatarHeader
                role={isDoctor ? "doctor" : isAdmin ? "admin" : "patient"}
                isProfile={isProfile}
              />
            </div>
          ) : (
            <Image
              className="w-14 h-14 rounded-full shadow-lg"
              src={imgSrc}
              width={1080}
              height={1080}
              alt="Doctor Profile Image"
            />
          )}
          <h5
            style={{ textShadow: "4px 4px 2px #000" }}
            className="mb-1 text-xl font-medium text-gray-900 dark:text-white mr-3 ml-3"
          >
            {username} <br />
            <div className="text-sm text-gray-500 dark:text-gray-400 ">
              {speciality}
            </div>
          </h5>
          {isProfile && (
            <div
              className={`${
                isProfile && "mt-3"
              } flex items-center flex-col ml-5`}
            >
              <i className="fas fa-hospital dark:text-white text-black pr-3 text-5xl mb-1"></i>{" "}
              Hospital - {hospitalId}
            </div>
          )}
          {isPatient && (
            <div className="flex items-center ml-3">
              {!isAccessGranted ? (
                <button
                  onClick={() =>
                    AccessControl && AccessControl(!!isAccessGranted, username)
                  }
                  className="bg-green-700 hover:bg-green-800 text-white font-normal p-2 rounded float-right"
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

import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

interface hospitalCard {
  name: string;
  address: string;
  city: string;
  img: string;
  id: number;
}

const HospitalCard: React.FC<hospitalCard> = ({
  name,
  address,
  city,
  img,
  id,
}) => {
  const router = useRouter();
  return (
    <div
      className="flex mt-6 justify-center"
      onClick={() => router.push(`/patients/hospitals/${id}`)}
    >
      <div className="w-full rounded-xl   max-w-sm bg-white border border-x-white  shadow-md hover:shadow-xl dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col cursor-pointer items-center">
          <Image
            className="mb-6 rounded-t-xl w-64 cursor-pointer h-60"
            src={img}
            width={720}
            height={720}
            alt="Hospital Image"
          />
          <h5 className="mb-1 cursor-pointer text-xl font-medium text-gray-900 dark:text-white">
            <i className="fas fa-hospital dark:text-white text-black pr-3"></i>
            {name}
          </h5>
          <span className="text-sm mt-1 cursor-pointer dark:text-white text-black">
            {address}
          </span>
          <div className="flex items-center cursor-pointer mt-1 mb-3">
            {city}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalCard;

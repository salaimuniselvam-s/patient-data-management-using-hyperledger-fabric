import { useTheme } from "../context/Themeprovider";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { useAppSelector } from "@/redux/store";
import { redirectToProfilePage } from "@/utils/routeUtils";
import HomeButtons from "./Helper/HomeButtons";

export default function Home() {
  const { isTheme, toggleTheme } = useTheme();

  return (
    <>
      <div className="flex flex-col md:flex-row  text-black/90 dark:text-white/90 max-w-7xl px-6 mx-auto mt-12">
        <div className="md:w-1/2 py-6">
          <div className="w-full">
            <h1 className="text-3xl font-bold mb-3">
              Elevate your patient data management with the power of Fabric.
            </h1>
            <p className="border-b-4 w-3/5 rounded-lg border-orange-400 mb-4"></p>
            <p className="mb-3 text-lg">
              Patient data management solution built on Hyperledger Fabric
              provides a highly secure and scalable platform for sharing patient
              data across healthcare providers.
            </p>
            <p className="mb-3 text-lg">
              With advanced features such as smart contracts, access control,
              and consent management, we ensure that patient data is accessed
              only by authorized parties and in a transparent manner.
            </p>
            <p className="mb-3 text-lg">
              With a focus on patient privacy and security, our solution
              empowers healthcare providers to make informed decisions and
              deliver the best possible care to their patients
            </p>
          </div>
          <div className="flex justify-center pt-3 md:justify-normal gap-6">
            <HomeButtons />
          </div>
        </div>
        <div className="md:w-1/2">
          <div className="w-full flex justify-center items-center">
            <Image
              src={"/Doctors.png"}
              alt="Doctor Picture"
              className="image"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </>
  );
}

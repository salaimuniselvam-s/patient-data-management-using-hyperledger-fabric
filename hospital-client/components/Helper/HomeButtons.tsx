import { useAppSelector } from "@/redux/store";
import { redirectToProfilePage } from "@/utils/routeUtils";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const HomeButtons = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const authState = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (authState.loggedIn && authState.role) setIsUserLoggedIn(true);
  }, [authState]);

  if (isUserLoggedIn)
    return (
      <>
        <Link href={redirectToProfilePage(authState.role)}>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
            View Profile
          </button>
        </Link>
        {/* <button
          onClick={() => dispatch(logOutUser())}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          Log Out
        </button> */}
      </>
    );

  return (
    <div className="flex flex-wrap gap-6">
      <Link href="/register-patient">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
          Register
        </button>
      </Link>
      <Link href="/login">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Sign In
        </button>
      </Link>
    </div>
  );
};

export default HomeButtons;

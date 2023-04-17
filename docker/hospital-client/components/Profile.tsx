import { useEffect, useState } from "react";
import Image from "next/image";
import { useAppDispatch } from "@/redux/store";
import { logOutUserAction } from "@/redux/actions/authActions";
import { getAuthCookies, getUserDetails } from "@/redux/utils/cookies";
import { generateUserProfilePicture } from "@/utils/generateUserProfilePicture";

interface ProfileProps {
  username: string;
  role: string;
}

const Profile: React.FC<ProfileProps> = ({ username, role }) => {
  const dispatch = useAppDispatch();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      event.target instanceof Element &&
      !event.target.closest(".profile-dropdown")
    ) {
      setIsOpen(false);
    }
  };

  // Hiding User Profile Icon If User is not logged in
  const token = getAuthCookies().accessToken;
  useEffect(() => {
    if (token && role && username) {
      setIsUserLoggedIn(true);
    }
  }, [token, role, username]);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  if (!isUserLoggedIn) {
    return null;
  }

  return (
    <div className="relative">
      <button
        className="flex items-center justify-center w-12 h-12 rounded-full"
        onClick={toggleDropdown}
      >
        <Image
          src={generateUserProfilePicture(role)}
          alt="User Picture"
          className="image cursor-pointer"
          typeof="button"
          itemType="button"
          width={500}
          height={500}
        />
      </button>
      {isOpen && (
        <div
          style={{
            minWidth: "200px",
            width: `${
              username.toString().length *
                (username.toString().length < 12 ? 16 : 12) +
              64
            }px`,
          }}
          className="absolute  right-0 z-50 py-2 mt-2 bg-gray-300 dark:bg-gray-200 rounded-lg shadow-lg profile-dropdown transition-opacity duration-500 ease-in-out"
        >
          <div className="flex justify-between  flex-col md:flex-row">
            <div className="flex  mb-4">
              <Image
                className=" w-16 h-16 rounded-full shadow-lg"
                src={generateUserProfilePicture(role)}
                width={720}
                height={720}
                alt="Doctor Profile Image"
              />
              <div className="font-semibold text-black pl-3 pt-1 text-xl">
                {username}
                <span className="block font-normal text-lg">{role}</span>
              </div>
            </div>
          </div>
          <div
            className="block px-4 py-2 text-lg text-black cursor-pointer hover:bg-gray-300"
            onClick={() => dispatch(logOutUserAction())}
          >
            <i className="fas fa-sign-out-alt mr-2"></i> Sign out
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

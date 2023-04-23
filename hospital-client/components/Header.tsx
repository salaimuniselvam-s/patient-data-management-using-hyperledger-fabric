import { useTheme } from "../context/Themeprovider";
import Link from "next/link";
import { motion } from "framer-motion";
import { Fragment, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "next/router";
import { navbarRoutes } from "@/utils/navbarRoutes";
import { Transition } from "@headlessui/react";
import { isPageActive } from "@/utils/routeUtils";
import Profile from "./Profile";
import { getUserDetails } from "@/redux/utils/cookies";
import { logOutUser } from "@/redux/actions/authActions";

export default function Header() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isTheme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({
    loggedIn: false,
    role: "",
  });
  const authState = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (authState.loggedIn) {
      setLoggedInUser({ loggedIn: authState.loggedIn, role: authState.role });
    }
  }, [authState]);

  return (
    <div className="header">
      <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6 ">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-2xl font-bold transition-all duration-200  text-black/90 dark:text-white/90 "
            >
              <i className="fa-solid fa-user-doctor cursor-pointer"></i>
              <span className="ml-1 cursor-pointer"> Patently</span>
            </Link>
          </div>
          <div className="flex space-x-16">
            <nav className="hidden md:flex space-x-10 items-center justify-center pl-6">
              {navbarRoutes(loggedInUser.loggedIn, loggedInUser.role).map(
                (page, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href={page.href} key={page.name}>
                      <button
                        className={`${
                          isPageActive(router.pathname, page.href)
                            ? "text-gray-900 dark:text-gray-100"
                            : "text-gray-700 dark:text-gray-300"
                        } hover:text-gray-900 dark:hover:text-gray-100 text-xl font-semibold button-text cursor-pointer`}
                      >
                        {isPageActive(router.pathname, page.href) ? (
                          <span className="border-b-2 border-black dark:border-white p-2 cursor-pointer">
                            {" "}
                            <i
                              className={`${page.icon.active} text-gray-900 pr-1 dark:text-gray-100`}
                            />{" "}
                            {page.name}
                          </span>
                        ) : (
                          <span className="cursor-pointer">
                            {" "}
                            <i
                              className={`${page.icon.default} text-black dark:text-white pr-1 cursor-pointer`}
                            />{" "}
                            {page.name}
                          </span>
                        )}
                      </button>
                    </Link>
                  </motion.div>
                )
              )}
            </nav>
            <div className="flex gap-8 items-center">
              <div className="hidden md:flex">
                <Profile
                  username={getUserDetails().username}
                  role={getUserDetails().role}
                />
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="-mr-2 hidden  md:block"
              >
                <div
                  onClick={() => toggleTheme()}
                  className="cursor-pointer  bg-primary shadow-2xl shadow-primary text-2xl text-white hover:text-white hover:dark:text-white  w-12 h-10 flex items-center justify-center rounded-lg transition-all duration-200"
                >
                  {isTheme === "dark" ? (
                    <i className="fas fa-moon cursor-pointer" />
                  ) : (
                    <i className="fas fa-sun cursor-pointer" />
                  )}
                </div>
              </motion.div>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className=" md:hidden flex"
            >
              <a
                onClick={() => setIsOpen(!isOpen)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary shadow-2xl shadow-primary text-2xl text-white hover:text-white hover:dark:text-white cursor-pointer w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-200"
              >
                <i className="text-2xl fas fa-bars" />
              </a>
            </motion.div>
          </div>
        </div>
        <Transition
          as={Fragment}
          show={isOpen ? true : false}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div
            style={{ zIndex: 9999 }}
            className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden "
          >
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-black divide-y-2 divide-gray-50">
              <div className="p-6">
                <div className="flex items-center justify-between px-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div
                      onClick={() => toggleTheme()}
                      className="cursor-pointer  bg-primary shadow-2xl shadow-primary text-2xl text-white hover:text-white hover:dark:text-white  w-12 h-10 flex items-center justify-center rounded-lg transition-all duration-200"
                    >
                      {isTheme === "dark" ? (
                        <i className="fas fa-moon cursor-pointer" />
                      ) : (
                        <i className="fas fa-sun cursor-pointer" />
                      )}
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div>
                      <button
                        onClick={() => setIsOpen(!isOpen)}
                        type="button"
                        className="bg-primary shadow-2xl shadow-primary text-2xl text-white hover:text-white hover:dark:text-white cursor-pointer w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-200"
                      >
                        <i className="fa-solid fa-times" />
                      </button>
                    </div>
                  </motion.div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-8">
                    {navbarRoutes(loggedInUser.loggedIn, loggedInUser.role).map(
                      (page, index) => (
                        <motion.div key={index} whileHover={{ scale: 1.05 }}>
                          <Link
                            href={page.href}
                            key={page.name}
                            className={` p-3  flex justify-center items-center rounded-md hover:bg-gray-50 dark:hover:bg-gray-900/50 button-text ${
                              isPageActive(router.pathname, page.href)
                                ? "bg-gray-50 dark:bg-gray-900/50"
                                : "text-gray-900 dark:text-gray-100"
                            }`}
                          >
                            <i
                              className={`${
                                isPageActive(router.pathname, page.href)
                                  ? page.icon.active
                                  : page.icon.default
                              } text-black dark:text-white button-text`}
                            />
                            <span className="ml-3 text-base font-bold">
                              {page.name}
                            </span>
                          </Link>
                        </motion.div>
                      )
                    )}
                  </nav>
                </div>
                {loggedInUser.loggedIn && (
                  <div className="mt-12 flex justify-center">
                    <div
                      className="block px-4 py-2 text-lg text-white cursor-pointer"
                      onClick={() => dispatch(logOutUser())}
                    >
                      <i className="fas fa-sign-out-alt mr-2"></i> Sign out
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
}

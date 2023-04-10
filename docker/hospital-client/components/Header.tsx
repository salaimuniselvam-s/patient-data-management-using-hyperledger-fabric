import { useTheme } from "../context/Themeprovider";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Header() {
  const { isTheme, toggleTheme } = useTheme();

  return (
    <div className="header">
      <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-2xl font-bold transition-all duration-200 button-text  text-black/90 dark:text-white/90 "
            >
              <i className="fa-solid fa-user-doctor cursor-pointer"></i>
              <span className="ml-1 cursor-pointer"> Patently</span>
            </Link>
          </div>
          <div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
        </div>
      </div>
    </div>
  );
}

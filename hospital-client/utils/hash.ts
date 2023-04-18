import { SAMPLE_SALT } from "@/constants/constants";
import bcrypt from "bcryptjs";

export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, process.env.NEXT_PUBLIC_SALT || SAMPLE_SALT);
};

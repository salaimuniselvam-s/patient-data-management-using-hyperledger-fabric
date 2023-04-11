import { ROLE_ADMIN, ROLE_DOCTOR, ROLE_PATIENT } from "@/constants/constants";

export const redirectToProfilePage = (user: string) =>
  user === ROLE_ADMIN
    ? "/admin"
    : user === ROLE_DOCTOR
    ? "/doctors"
    : user === ROLE_PATIENT
    ? "/patients"
    : "/";

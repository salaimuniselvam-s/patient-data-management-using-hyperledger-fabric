import { ROLE_ADMIN, ROLE_DOCTOR, ROLE_PATIENT } from "@/constants/constants";

export const redirectToProfilePage = (user: string) =>
  user === ROLE_ADMIN
    ? "/admin"
    : user === ROLE_DOCTOR
    ? "/doctor"
    : user === ROLE_PATIENT
    ? "/patients"
    : "/";

export const isPageActive = (pathname: string, url: string) => {
  if (
    pathname === "/patients/hospitals/[slug]" &&
    url === "/patients/hospitals"
  )
    return true;
  return pathname === url;
};

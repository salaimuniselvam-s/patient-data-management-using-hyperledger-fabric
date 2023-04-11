const ROLE_ADMIN = "admin";
const ROLE_DOCTOR = "doctor";
const ROLE_PATIENT = "patient";

const CHANGE_TMP_PASSWORD = "CHANGE_TMP_PASSWORD";

/**
 * @param  {string[]} roles The roles delimited by | against which the validation needs to be done
 * @param  {String} reqRole The role to be validated
 * @param  {Response} res 401 is reqRole is not present n roles
 * @description Validation of the role
 * @example roles - 'patient|doctor' reqRole - 'admin' returns 401
 */
const validateRole = async (roles, reqRole, res) => {
  if (
    !reqRole ||
    !roles ||
    reqRole.length === 0 ||
    roles.length === 0 ||
    !roles.includes(reqRole)
  ) {
    // user's role is not authorized
    return true;
  }
};

/**
 * @param  {String} s Any string
 * @return {String} First letter capitalized string
 * @description Capitalizes the first letter of the string
 */
const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const generateHospitalAdmin = (hospitalId) => {
  let admins = {
    1: "hosp1admin",
    2: "hosp2admin",
  };
  return admins[hospitalId] || "";
};

const TEMP_PASSWORD = "temp-password";

function waitSeconds(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

module.exports = {
  CHANGE_TMP_PASSWORD,
  ROLE_ADMIN,
  ROLE_DOCTOR,
  ROLE_PATIENT,
  capitalize,
  validateRole,
  generateHospitalAdmin,
  TEMP_PASSWORD,
  waitSeconds,
};

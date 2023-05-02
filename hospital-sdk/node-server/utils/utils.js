const { TokenSchema } = require("../db/schema");
const { hashPassword, comparePassword } = require("./hashPassword");
require("dotenv").config();
const salt = process.env.SAMPLE_SALT;

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

const TEMP_PASSWORD = hashPassword("temp-password", salt);

const HOSPITALS = [
  { hospitalId: 1, hospitalAdmin: "hosp1admin" },
  { hospitalId: 2, hospitalAdmin: "hosp2admin" },
];

function waitSeconds(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

function saveRefreshToken(refreshToken) {
  const tokenDetails = new TokenSchema({
    refreshToken: hashPassword(refreshToken, salt),
  });

  tokenDetails
    .save()
    .then(() => console.log("Refresh Token saved to database"))
    .catch((error) => {
      console.error(error);
      return res
        .status(406)
        .send("Failed to store Refresh Token into MongoDB Database");
    });
}

async function compareRefreshToken(refreshToken) {
  const hashedPassword = hashPassword(refreshToken, salt);
  const [refreshTokenDetails] = await TokenSchema.find({
    refreshToken: hashedPassword,
  });

  return comparePassword(refreshToken, refreshTokenDetails?.refreshToken || "");
}

async function deleteRefreshToken(refreshToken) {
  await TokenSchema.deleteMany({
    refreshToken: hashPassword(refreshToken, salt),
  });
}

const BASE_URL = "http://localhost:3001";

module.exports = {
  saveRefreshToken,
  compareRefreshToken,
  deleteRefreshToken,
  CHANGE_TMP_PASSWORD,
  ROLE_ADMIN,
  ROLE_DOCTOR,
  ROLE_PATIENT,
  HOSPITALS,
  capitalize,
  validateRole,
  generateHospitalAdmin,
  TEMP_PASSWORD,
  waitSeconds,
  BASE_URL,
};

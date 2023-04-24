const { hashPassword } = require("../utils/hashPassword");
const {
  ROLE_ADMIN,
  generateHospitalAdmin,
  BASE_URL,
} = require("../utils/utils");
require("dotenv").config();
const salt = process.env.SAMPLE_SALT;

const getAllRegisteredUsers = async () => {
  console.log("Fetching all the registered users..");
  const fetch = (await import("node-fetch")).default;
  const url = `${BASE_URL}/users/_all`;
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  };
  const response = await fetch(url, options);
  const allUsers = await response.json();
  return allUsers;
};

const isUserRegistered = async (username) => {
  console.log("Checking if user is registered..");
  const fetch = (await import("node-fetch")).default;
  const url = `${BASE_URL}/users/registered`;
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      username: username,
    }),
  };
  const response = await fetch(url, options);
  const isRegistered = await response.json();
  return isRegistered;
};

const fetchAccessToken = async (hospitalId) => {
  console.log("Fetching Access Token..");
  const fetch = (await import("node-fetch")).default;
  const url = `${BASE_URL}/auth/login`;
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      username: `${generateHospitalAdmin(hospitalId)}`,
      password: hashPassword(`${generateHospitalAdmin(hospitalId)}pw`, salt),
      role: ROLE_ADMIN,
    }),
  };
  const response = await fetch(url, options);
  const token = await response.json();
  console.log(token);
  return token.accessToken;
};

module.exports = { fetchAccessToken, isUserRegistered, getAllRegisteredUsers };

const { ROLE_ADMIN, generateHospitalAdmin } = require("../utils/utils");

const fetchAccessToken = async (hospitalId) => {
  console.log("Fetching Access Token..");
  const fetch = (await import("node-fetch")).default;
  const url = "http://localhost:3001/auth/login";
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      username: `${generateHospitalAdmin(hospitalId)}`,
      password: `${generateHospitalAdmin(hospitalId)}pw`,
      role: ROLE_ADMIN,
    }),
  };
  const response = await fetch(url, options);
  const token = await response.json();
  console.log(token);
  return token.accessToken;
};

const registerPatients = async (records) => {
  try {
    const fetch = (await import("node-fetch")).default;
    const accessToken = await fetchAccessToken(records.hospitalId);
    console.log("Register and Enrolling Patients..");
    const url = "http://localhost:3001/admin/patients/register";
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
        role: ROLE_ADMIN,
        username: `${generateHospitalAdmin(records.hospitalId)}`,
      },
      body: JSON.stringify(records),
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    console.log("Succesfully Enrolled");
  } catch (error) {
    console.error(error);
    console.error("Enrollment Failed Please Try Again");
  }
};

module.exports = { registerPatients, fetchAccessToken };

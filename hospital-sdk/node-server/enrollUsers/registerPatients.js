const { registerUser } = require("../../fabric-network/app");
const { BASE_URL } = require("../utils/utils");
const { isUserRegistered } = require("./utils");

const registerPatients = async (records, accessToken) => {
  try {
    const isRegistered = await isUserRegistered(records.username);
    if (isRegistered.isUserRegistered) {
      await registerUser(
        JSON.stringify({
          ...isRegistered.userDetails,
          userId: isRegistered.userDetails.username,
        })
      );
      return;
    }
    const fetch = (await import("node-fetch")).default;
    console.log("Register and Enrolling Patients..");
    const url = `${BASE_URL}/admin/patients/register`;
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
        // role: ROLE_ADMIN,
        // username: `${generateHospitalAdmin(records.hospitalId)}`,
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

module.exports = { registerPatients };

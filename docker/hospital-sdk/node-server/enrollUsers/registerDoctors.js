const { fetchAccessToken } = require("./registerPatients");

const registerDoctors = async (records) => {
  try {
    const fetch = (await import("node-fetch")).default;
    const accessToken = await fetchAccessToken(records.hospitalId);
    console.log("Register and Enrolling Doctors..");
    const url = "http://localhost:3001/admin/doctors/register";
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

module.exports = { registerDoctors, fetchAccessToken };

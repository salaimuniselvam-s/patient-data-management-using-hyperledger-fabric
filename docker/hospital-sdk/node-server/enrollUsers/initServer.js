const fs = require("fs");
const PatientDetails = require("./initPatients.json");
const DoctorDetails = require("./initDoctors.json");

/**
 * @description Register and Enroll Patients on the initPatients json.
 */
async function initPatients() {
  try {
    PatientDetails.map((data) => {
      console.log(data);
    });
  } catch (err) {
    console.log(err);
  }
}

/**
 * @description Create doctors in both organizations based on the initDoctors JSON
 */
async function initDoctors() {
  try {
    DoctorDetails.map((data) => {
      console.log(data);
    });
  } catch (error) {
    console.log(error);
  }
}

/**
 * @description Function to initialise the backend server, enrolls and regsiter the admins and initPatients.
 */
async function main() {
  // await enrollAdminHosp1();
  // await enrollAdminHosp2();
  await initPatients();
  await initDoctors();
}

main();

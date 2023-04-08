const PatientDetails = require("./initPatients");
const DoctorDetails = require("./initDoctors");
const enrollAdminHosp1 = require("./enrollAdmin-Hospital1.js");
const enrollAdminHosp2 = require("./enrollAdmin-Hospital2");
const { registerPatients } = require("./registerPatients");
const { registerDoctors } = require("./registerDoctors");
const { waitSeconds } = require("../utils/utils");

/**
 * @description Register and Enroll Patients on the initPatients json.
 */
async function initPatients() {
  try {
    for (const details of PatientDetails) {
      await registerPatients(details);
    }
  } catch (err) {
    console.error(err);
  }
}

/**
 * @description Create doctors in both organizations based on the initDoctors JSON
 */
async function initDoctors() {
  try {
    for (const details of DoctorDetails) {
      await registerDoctors(details);
    }
  } catch (error) {
    console.error(error);
  }
}

/**
 * @description Function to initialise the backend server, enrolls and regsiter the admins and initPatients.
 */
async function main() {
  await enrollAdminHosp1();
  await enrollAdminHosp2();

  await waitSeconds(5000);

  await initPatients();

  await waitSeconds(2000);

  await initDoctors();
}

main();

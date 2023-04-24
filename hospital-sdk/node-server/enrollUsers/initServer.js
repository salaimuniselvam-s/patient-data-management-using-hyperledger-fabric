const PatientDetails = require("./initPatients");
const DoctorDetails = require("./initDoctors");
const { registerPatients } = require("./registerPatients");
const { registerDoctors } = require("./registerDoctors");
const { waitSeconds } = require("../utils/utils");
const { getAllRegisteredUsers } = require("./utils");

/**
 * @description Register and Enroll Patients on the initPatients json.
 */
async function initPatients(PatientDetails) {
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
async function initDoctors(DoctorDetails) {
  try {
    for (const details of DoctorDetails) {
      await registerDoctors(details);
    }
  } catch (error) {
    console.error(error);
  }
}

/**
 * @description Function to register and enroll patients and doctors.
 */
async function main() {
  await initPatients(PatientDetails);
  await waitSeconds(2000);
  await initDoctors(DoctorDetails);
  const allUsers = await getAllRegisteredUsers();
  // Creating Wallets for already enrolled doctors who is not in the test record
  const testDoctors = DoctorDetails.map((details) => details.username);
  const doctors = allUsers
    ?.filter((details) => details.role === "doctor")
    .filter((doctors) => !testDoctors.includes(doctors.username));
  await initDoctors(doctors);

  // Creating Wallets for already enrolled patients who is not in the test record
  const testPatients = PatientDetails.map((details) => details.username);
  const patients = allUsers
    ?.filter((details) => details.role === "patient")
    .filter((patients) => !testPatients.includes(patients.username));
  await initPatients(patients);
}

main();

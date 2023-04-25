const PatientDetails = require("./initPatients");
const DoctorDetails = require("./initDoctors");
const { registerPatients } = require("./registerPatients");
const { registerDoctors } = require("./registerDoctors");
const { waitSeconds } = require("../utils/utils");
const { getAllRegisteredUsers, fetchAccessToken } = require("./utils");

/**
 * @description Register and Enroll Patients on the initPatients json.
 */
async function initPatients(PatientDetails, accessToken) {
  try {
    for (const details of PatientDetails) {
      await registerPatients(details, accessToken[details.hospitalId]);
    }
  } catch (err) {
    console.error(err);
  }
}

/**
 * @description Create doctors in both organizations based on the initDoctors JSON
 */
async function initDoctors(DoctorDetails, accessToken) {
  try {
    for (const details of DoctorDetails) {
      await registerDoctors(details, accessToken[details.hospitalId]);
    }
  } catch (error) {
    console.error(error);
  }
}

/**
 * @description Function to register and enroll patients and doctors.
 */
async function main() {
  const hospital1AccessToken = await fetchAccessToken("1");
  const hospital2AccessToken = await fetchAccessToken("2");
  let accessToken = {
    1: hospital1AccessToken,
    2: hospital2AccessToken,
  };

  await initPatients(PatientDetails, accessToken);
  await waitSeconds(2000);
  await initDoctors(DoctorDetails, accessToken);
  const allUsers = await getAllRegisteredUsers();
  // Creating Wallets for already enrolled doctors who is not in the test record
  const testDoctors = DoctorDetails.map((details) => details.username);
  const doctors = allUsers
    ?.filter((details) => details.role === "doctor")
    .filter((doctors) => !testDoctors.includes(doctors.username));
  await initDoctors(doctors, accessToken);

  // Creating Wallets for already enrolled patients who is not in the test record
  const testPatients = PatientDetails.map((details) => details.username);
  const patients = allUsers
    ?.filter((details) => details.role === "patient")
    .filter((patients) => !testPatients.includes(patients.username));
  await initPatients(patients, accessToken);
}

main();

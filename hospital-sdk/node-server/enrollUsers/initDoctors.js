const { TEMP_PASSWORD } = require("../utils/utils");

const DOCTOR_DETAILS = [
  {
    hospitalId: "1",
    firstName: "Rajesh",
    lastName: "Kumar",
    speciality: "Neurosurgery",
    username: "Rajesh Kumar",
    password: TEMP_PASSWORD,
  },
  {
    hospitalId: "2",
    firstName: "Kailash",
    lastName: "Balaji",
    speciality: "General Practitioner",
    username: "Kailash Balaji",
    password: TEMP_PASSWORD,
  },
  {
    hospitalId: "1",
    firstName: "Deepak",
    lastName: "Chakravarthy",
    speciality: "Cardiology",
    username: "Deepak",
    password: TEMP_PASSWORD,
  },
  {
    hospitalId: "2",
    firstName: "Mahesh",
    lastName: "Babu",
    speciality: "Dermatologist",
    username: "Mahesh Babu",
    password: TEMP_PASSWORD,
  },
  {
    hospitalId: "1",
    firstName: "Madhan",
    lastName: "Karthi",
    speciality: "Psychiatrist",
    username: "Madhan Karthi",
    password: TEMP_PASSWORD,
  },
];

module.exports = DOCTOR_DETAILS;

// Doctor Tasks

// Login Patient
// http://localhost:3001/auth/login - Bearer -
// {"role":"patient","username":"PID6","password":"n93b2xlk"}

// getPatientById - Bearer -  role & username in header
// http://localhost:3001/patients/PID1

// updatePatientPersonalDetails - Bearer - role & username in header
// http://localhost:3001/patients/PID1/update/personaldetails
// {"patientId":"PID1",
// "firstName":"salaimuniselvam7",
// "lastName":"324",
// }

// getPatientHistoryById - Bearer - role & username in header
// http://localhost:3001/patients/PID10/history

// getDoctorsByHospitalId - Bearer - role  in header
// http://localhost:3001/patients/doctors/1/_all

// grantAccessToDoctor - Bearer - role & username in header
// http://localhost:3001/patients/PID10/grant/RAJ7

// revokeAccessToDoctor - Bearer - role & username in header
// http://localhost:3001/patients/PID10/revoke/RAJ7

// Doctor Tasks

// Login Doctor
// http://localhost:3001/auth/login
// {"role":"doctor","username":"ramesh","password":"sms7"}

// updatePatientMedicalDetails -> patch -> Bearer -> role - Doctor in header
// http://localhost:3001/doctors/patients/PID1/details/medical
// {
//     "patientId":"PID1",
//     "newSymptoms":"Cancer"
// }

// getDoctorById -> get -> Bearer -> role - Doctor in header
// http://localhost:3001/doctors/1/ramesh

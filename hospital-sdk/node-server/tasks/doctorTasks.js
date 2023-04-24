// Doctor Tasks

// Login Doctor
// BASE_URL/auth/login
// {"role":"doctor","username":"ramesh","password":"sms7"}

// updatePatientMedicalDetails -> patch -> Bearer -> role - Doctor in header
// BASE_URL/doctors/patients/PID1/details/medical
// {
//     "patientId":"PID1",
//     "newSymptoms":"Cancer"
// }

// getDoctorById -> get -> Bearer -> role - Doctor in header
// BASE_URL/doctors/1/ramesh

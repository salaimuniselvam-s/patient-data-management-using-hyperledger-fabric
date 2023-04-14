export interface PatientDetails {
  [key: string]: FormDataEntryValue | null;
}

export interface PatientUpdatePersonalDetails {
  age: string;
  address: string;
  bloodGroup: string;
  emergPhoneNumber?: string;
  phoneNumber: string;
}

export interface DoctorUpdatePatientRecords {
  followUp: string;
  bloodGroup: string;
  allergies: string;
  diagnosis: string;
  symptoms: string;
  treatment: string;
}

export interface PatientHistory extends DoctorUpdatePatientRecords {
  changedBy: string;
  Timestamp: { seconds: string; nanos: string };
}
export interface PatientDetailsUpdateByDoctor
  extends DoctorUpdatePatientRecords {
  age: string;
  patientId: string;
}

export interface PatientRegistrationFields
  extends PatientUpdatePersonalDetails {
  password: string;
  hospitalId: string;
  username: string;
}

export interface PatientPersonalDetails {
  patientId: string;
  firstName: string;
  lastName: string;
  age: string;
  phoneNumber: string;
  emergPhoneNumber: string;
  address: string;
  bloodGroup: string;
  allergies: string;
  symptoms: string;
  diagnosis: string;
  treatment: string;
  followUp: string;
  permissionGranted: string[];
}

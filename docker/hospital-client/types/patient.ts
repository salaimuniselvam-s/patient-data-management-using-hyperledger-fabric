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

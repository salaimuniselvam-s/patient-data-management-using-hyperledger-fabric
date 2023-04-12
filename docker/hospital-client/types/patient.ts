export interface PatientDetails {
  [key: string]: FormDataEntryValue | null;
}

export interface PatientRegistrationFields {
  username: string;
  password: string;
  hospitalId: string;
  age: string;
  address: string;
  bloodGroup: string;
  phoneNumber: string;
}

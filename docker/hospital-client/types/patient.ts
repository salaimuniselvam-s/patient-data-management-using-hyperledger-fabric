export interface PatientDetails {
  [key: string]: FormDataEntryValue | null;
}

export interface PatientRegistrationFields {
  [key: string]: string | number | FormDataEntryValue | null;
  username: string;
  password: string;
  hospitalId: number;
  age: number;
  address: string;
  bloodGroup: string;
  phoneNumber: number;
}

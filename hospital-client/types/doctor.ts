export interface DoctorDetails {
  [key: string]: FormDataEntryValue | null;
}

export interface DoctorRegistrationFields {
  username: string;
  password: string;
  hospitalId: string;
  speciality: string;
}

export interface DoctorDetails {
  [key: string]: FormDataEntryValue | null;
}

export interface DoctorRegistrationFields {
  [key: string]: string | number | FormDataEntryValue | null;
  username: string;
  password: string;
  hospitalId: number;
  speciality: string;
}

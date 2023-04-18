export interface UserCredentials {
  username: string;
  password: string;
  role: string;
}

export interface UserCredentialsFields {
  [key: string]: string | number | FormDataEntryValue | null;
  username: string;
  password: string;
  role: string;
}

export interface User {
  id?: number;
  username: string;
  email: string;
  password?: string;
  role: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  createdDate?: string;
  enabled?: boolean;
}
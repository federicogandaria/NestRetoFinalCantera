export interface ICustomer {
  id: string;
  document: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  avatarUrl?: string | null;
}

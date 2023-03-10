import { v4 as uuid } from 'uuid';

export class CustomerEntity {
  id = uuid();
  document: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  avatarUrl?: string | null;
}

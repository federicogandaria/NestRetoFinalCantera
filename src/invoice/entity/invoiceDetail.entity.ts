import { v4 as uuid } from 'uuid';

export class invoiceDetailEntity {
  id = uuid();
  description: string;
  date: Date;
  sellerName: string;
  buyerName: string;
  additionalNotes: string;
}

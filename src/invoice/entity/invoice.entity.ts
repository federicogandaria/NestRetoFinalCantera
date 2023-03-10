import { v4 as uuid } from 'uuid';
import { invoiceDetailEntity } from './invoiceDetail.entity';

export class invoiceEntity extends invoiceDetailEntity {
  id = uuid();
  quantity: number;
  unitPrice: number;
  total: number;
  details: invoiceDetailEntity;
}

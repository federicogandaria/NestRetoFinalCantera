import { invoiceDetailEntity } from '../entity/invoiceDetail.entity';

export interface IInvoice {
  id: string;
  quantity: number;
  unitPrice: number;
  total: number;
  details: invoiceDetailEntity;
}

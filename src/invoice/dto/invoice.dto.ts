import { invoiceDetailEntity } from '../entity/invoiceDetail.entity';
import { v4 as uuid } from 'uuid';
import {
  IsNumber,
  IsUUID,
  ValidateNested,
  ValidationOptions,
} from 'class-validator';

export class InvoiceDto {
  @IsUUID(4, { message: 'this must to be uuid' })
  id = uuid();

  @IsNumber(undefined, {
    message: 'El campo "cantidad" debe ser un número válido',
  } as ValidationOptions)
  quantity: number;

  @IsNumber(undefined, {
    message: 'El campo "precio por unidad" debe ser un número válido',
  } as ValidationOptions)
  unitPrice: number;

  @IsNumber(undefined, {
    message: 'El campo "total" debe ser un número válido',
  } as ValidationOptions)
  total: number;

  @ValidateNested()
  details: invoiceDetailEntity;
}

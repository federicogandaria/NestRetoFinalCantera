import { Injectable, NotFoundException } from '@nestjs/common';
import { invoiceEntity } from '../entity/invoice.entity';
import { IInvoice } from '../interface/invoice.interface';
import { InvoiceDto } from '../dto/invoice.dto';

@Injectable()
export class InvoiceService {
  private readonly facturas: invoiceEntity[] = [];

  getInvoiceInfo(invoiceId: string): invoiceEntity {
    return this.findOneById(invoiceId);
  }
  createInvoice(invoice: InvoiceDto): invoiceEntity {
    const newInvoice = new invoiceEntity();
    newInvoice.quantity = invoice.quantity;
    newInvoice.unitPrice = invoice.unitPrice;
    newInvoice.total = invoice.total;

    newInvoice.details = invoice.details;

    const customer = this.register(newInvoice);
    return customer;
  }
  changeTotal(id: string, total: number): void {
    const cambiarTotal = this.findOneById(id);
    cambiarTotal.total = total;
    this.update(id, cambiarTotal);
  }
  deleteUser(id: string): void {
    this.delete(id);
  }
  register(entity: invoiceEntity): invoiceEntity {
    this.facturas.push(entity);
    return this.facturas.at(-1) ?? entity;
  }

  update(id: string, entity: invoiceEntity): invoiceEntity {
    const indexCurrentEntity = this.facturas.findIndex(
      (item) => item.id === id,
    );
    if (indexCurrentEntity >= 0)
      this.facturas[indexCurrentEntity] = {
        ...this.facturas[indexCurrentEntity],
        ...entity,
        id,
      } as invoiceEntity;
    else throw new NotFoundException();
    return this.facturas[indexCurrentEntity];
  }

  delete(id: string): void {
    this.facturas.splice(
      this.facturas.findIndex((item) => item.id === id),
      1,
    );
  }

  findAll(): IInvoice[] {
    return this.facturas;
  }

  findOneById(id: string): invoiceEntity {
    const currentEntity = this.facturas.find((item) => item.id === id);
    if (currentEntity) return currentEntity;
    else throw new NotFoundException('Elemento no encontrado');
  }
}

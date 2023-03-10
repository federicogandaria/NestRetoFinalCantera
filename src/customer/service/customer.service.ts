import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { customerDto } from '../dto/customer.dto';
import { CustomerEntity } from '../persistence/entity/customer.entity';
import { ICustomer } from '../interface/customer.interface';

export class CustomerService {
  private readonly users: CustomerEntity[] = [];

  createCustomer(newCustomer: customerDto): ICustomer {
    const user: ICustomer = {
      id: uuid(),
      document: newCustomer.document,
      fullName: newCustomer.fullName,
      email: newCustomer.email,
      phone: newCustomer.phone,
      password: newCustomer.password,
      avatarUrl: newCustomer.avatarUrl ?? undefined,
    };

    this.users.push(user);
    return user;
  }

  getCustomers(): CustomerEntity[] {
    return this.users;
  }

  findOneById(id: string): CustomerEntity {
    const user = this.users.find((item) => item.id === id);
    if (user) return user;
    else
      throw new HttpException('No se encontro el id we', HttpStatus.NOT_FOUND);
  }

  update(id: string, entity: customerDto): CustomerEntity {
    const indexCurrentEntity = this.users.findIndex((item) => item.id === id);
    if (indexCurrentEntity >= 0)
      this.users[indexCurrentEntity] = {
        ...this.users[indexCurrentEntity],
        ...entity,
        id,
      } as CustomerEntity;
    else throw new NotFoundException();
    return this.users[indexCurrentEntity];
  }
  changeName(id: string, name: string): customerDto {
    const cambiarNombre = this.findOneById(id);
    if (cambiarNombre) {
      cambiarNombre.fullName = name;
      return this.update(id, cambiarNombre);
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
  deleteCustomer(id: string): void {
    this.delete(id);
  }
  delete(id: string): void {
    this.users.splice(
      this.users.findIndex((item) => item.id === id),
      1,
    );
  }
}

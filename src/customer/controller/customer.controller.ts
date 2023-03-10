import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Interceptor } from 'src/interceptors/transform.interceptor';
import { CustomerService } from '../service/customer.service';
import { customerDto } from '../dto/customer.dto';
import { ICustomer } from '../interface/customer.interface';
import { AuthGuard } from 'src/guard/auth.guard';
import { CustomerEntity } from '../persistence/entity/customer.entity';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('create')
  @UseInterceptors(Interceptor)
  @UsePipes(new ValidationPipe())
  createUser(@Body() createUser: customerDto): ICustomer {
    const crearUsuario = this.customerService.createCustomer(createUser);
    if (crearUsuario) {
      return crearUsuario;
    } else {
      throw new HttpException(
        'Error creating user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @UseGuards(AuthGuard)
  @Get()
  getCustomers(): ICustomer[] {
    const GetCustomers = this.customerService.getCustomers();
    if (GetCustomers) {
      return GetCustomers;
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  getCustomerInfo(@Param('id', ParseUUIDPipe) userId: string): CustomerEntity {
    return this.customerService.findOneById(userId);
  }
  @UseGuards(AuthGuard)
  @Put('/:id')
  updateCustomer(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() usuario: customerDto,
  ): CustomerEntity {
    return this.customerService.update(id, usuario);
  }
  @UseGuards(AuthGuard)
  @Patch('updateName/:id')
  changeName(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('Name') name: string,
  ): void {
    this.customerService.changeName(id, name);
  }
  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  deleteCustomer(@Param('id') id: string): boolean {
    this.customerService.deleteCustomer(id);
    return true;
  }
}

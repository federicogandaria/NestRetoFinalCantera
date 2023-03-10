import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { invoiceEntity } from '../entity/invoice.entity';
import { InvoiceService } from '../service/invoice.service';
import { InvoiceDto } from '../dto/invoice.dto';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  @Post('create')
  createInvoice(@Body() create: InvoiceDto): invoiceEntity {
    return this.invoiceService.createInvoice(create);
  }

  @UseGuards(AuthGuard)
  @Get()
  getAll() {
    return this.invoiceService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getInvoiceInfo(@Param('id', ParseUUIDPipe) userId: string): invoiceEntity {
    return this.invoiceService.findOneById(userId);
  }

  @UseGuards(AuthGuard)
  @Patch('updateTotal/:id')
  changeTotal(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('Total') total: number,
  ): string {
    this.invoiceService.changeTotal(id, total);
    return 'listo rey';
  }

  @UseGuards(AuthGuard)
  @Put('/:id')
  updateInvoice(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() invoice: invoiceEntity,
  ): invoiceEntity {
    return this.invoiceService.update(id, invoice);
  }

  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  deleteInvoice(@Param('id') id: string): boolean {
    this.invoiceService.deleteUser(id);
    return true;
  }
}

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { customerDto } from '../customer/dto/customer.dto';

@Injectable()
export class Interceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((customer: customerDto) => {
        customer.avatarUrl = customer.avatarUrl ?? null;
        return customer;
      }),
    );
  }
}

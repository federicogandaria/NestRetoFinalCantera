import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class TestMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(req.body);
    next();
    if (req.method === 'PUT') {
      const requestUrl = req.url.substring(10);
      console.log(requestUrl);
    }
  }
}

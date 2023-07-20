import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
@Injectable()
export class UserIDlMiddlewareVerify implements NestMiddleware {
  async use(req: Request, _: Response, next: NextFunction) {
    if (isNaN(Number(req.params.id)) || Number(req.params.id) <= 0) {
      throw new BadRequestException('Id inválido!');
    }
    next();
  }
}

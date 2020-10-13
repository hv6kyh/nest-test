import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class MyMiddle implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    Logger.log('미들웨어 탔음');
    // Logger.log('res: ', res);
    next();
  }
}

import { Logger } from '@nestjs/common';
import { Request, Response } from 'express';

export function myLogger(req: Request, res: Response, next: Function) {
  Logger.log('함수적 미들웨어 탐');
  next();
}

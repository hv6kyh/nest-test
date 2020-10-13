import { HttpException } from '@nestjs/common';

export class MyException extends HttpException {
  constructor(status: number, message: string) {
    super(message, status);
  }
}

import { BadRequestException } from '@nestjs/common';

export class Response {
  data: any | any[];
  code: number;

  constructor(message: ResponseMessage) {
    this.data = message.Data;
    this.code = message.Code;
  }
}

export class ResponseMessage {
  private data: any | any[];
  private code: number;

  public success(): ResponseMessage {
    this.code = 1;
    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  public error(code: number, message: string = 'Error'): ResponseMessage {
    // this.code = code;
    // this.data = { message };
    // return this;
    throw new BadRequestException();
  }

  public body(data: any | any[]): ResponseMessage {
    this.data = data;
    return this;
  }

  get Data(): any | any[] {
    return this.data;
  }

  get Code(): number {
    return this.code;
  }

  public build(): Response {
    return new Response(this);
  }
}

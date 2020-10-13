import { Controller, Get, Ip, Logger } from '@nestjs/common';

@Controller('test')
export class TestController {
  @Get()
  async getIp(@Ip() ip): Promise<string> {
    try {
      return ip;
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
}

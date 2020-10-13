import { Controller, Delete, Post } from '@nestjs/common';
import { NestEventEmitter } from 'nest-event';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly nestEventEmitter: NestEventEmitter) {}
  @Post('airport')
  public async createAirportReservation(): Promise<string> {
    this.nestEventEmitter.emit('new-reservation');

    return '공항서비스 생성됨';
  }

  @Post('taxi')
  public async createTaxiReservation(): Promise<string> {
    this.nestEventEmitter.emit('new-reservation');

    return '택시 생성됨';
  }

  @Delete('airport')
  public async cancelAirportReservation(): Promise<string> {
    this.nestEventEmitter.emit('cancel-reservation');

    return '공항서비스 취소됨';
  }

  @Delete('taxi')
  public async cancelTaxiReservation(): Promise<string> {
    this.nestEventEmitter.emit('cancel-reservation');

    return '택시 취소됨';
  }
}

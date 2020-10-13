import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { HeroKilledDragonEvent } from '../event/hero-killed-dragon.event';

@EventsHandler(HeroKilledDragonEvent)
export class HeroKilledDragonHandler implements IEventHandler<HeroKilledDragonEvent> {
  logger = new Logger(HeroKilledDragonHandler.name);
  //   constructor(private repository: HeroRepository) {}
  constructor() {
    this.logger.log('이벤트 핸들러 생성');
  }

  handle(event: HeroKilledDragonEvent) {
    // logic
    this.logger.log('이벤트 실행');
  }
}

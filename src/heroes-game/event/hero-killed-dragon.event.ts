import { Logger } from '@nestjs/common';
import { Enemy } from '../../../output/entities';

export class HeroKilledDragonEvent {
  private readonly logger = new Logger(HeroKilledDragonEvent.name);

  constructor(public readonly heroId: number, public readonly ememy: Enemy) {
    this.logger.log('이벤트 생성');
    // this.logger.log(`몬스터 잡았고${heroId}${this.ememy?.toString()}`);
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { KillDragonCommand } from '../command/kill-dragon.command';
import { KillDragonDto } from '../dto';

@Injectable()
export class HeroesGameService {
  private readonly logger = new Logger(HeroesGameService.name);

  constructor(private commandBus: CommandBus) {}

  public async killDragon(killDragonDto: KillDragonDto) {
    this.logger.log('서비스 실행');
    return this.commandBus.execute(new KillDragonCommand(killDragonDto.hero_id, killDragonDto.dragon_id));
  }
}

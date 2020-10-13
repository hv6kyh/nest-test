import { Body, Controller, Logger, Param, Post } from '@nestjs/common';
import { KillDragonDto } from '../dto/dragon.dto';
import { HeroesGameService } from '../service/heroes-game.service';

@Controller('heroes-game')
export class HeroesGameController {
  private readonly logger = new Logger(HeroesGameController.name);

  constructor(private readonly heroesGameService: HeroesGameService) {}

  @Post(':hero_id/kill')
  killDragon(@Param('hero_id') param: number, @Body() dto: KillDragonDto) {
    this.logger.log('컨트롤러 진입');
    return this.heroesGameService.killDragon({
      hero_id: param,
      dragon_id: dto.dragon_id,
    });
  }
}

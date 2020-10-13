import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DragonRepository } from '../repository/dragon.repository';
import { HeroRepository } from '../repository/hero.repository';
import { HeroesGameController } from './controller/heroes-game.controller';
import { KillDragonHandler, HeroKilledDragonHandler } from './handler';
import { HeroesGameService } from './service/heroes-game.service';

export const CommandHandler = [KillDragonHandler];
export const EventsHandler = [HeroKilledDragonHandler];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([HeroRepository, DragonRepository])],
  controllers: [HeroesGameController],
  providers: [HeroesGameService, ...CommandHandler, ...EventsHandler],
})
export class HeroesGameModule {}

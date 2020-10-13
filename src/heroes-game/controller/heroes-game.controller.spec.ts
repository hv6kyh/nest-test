import { Test, TestingModule } from '@nestjs/testing';
import { HeroesGameController } from './heroes-game.controller';

describe('HeroesGame Controller', () => {
  let controller: HeroesGameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeroesGameController],
    }).compile();

    controller = module.get<HeroesGameController>(HeroesGameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

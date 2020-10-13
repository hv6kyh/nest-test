import { Test, TestingModule } from '@nestjs/testing';
import { HeroesGameService } from './heroes-game.service';

describe('HeroesGameService', () => {
  let service: HeroesGameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeroesGameService],
    }).compile();

    service = module.get<HeroesGameService>(HeroesGameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

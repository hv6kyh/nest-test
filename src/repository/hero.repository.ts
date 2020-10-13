import { Injectable, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Hero } from '../../output/entities/TblHero';

@Injectable()
@EntityRepository(Hero)
export class HeroRepository extends Repository<Hero> {
  findOneOrFail(heroId) {
    new Logger(HeroRepository.name).log('히어로 찾기');
    return super.findOneOrFail(heroId);
  }
}

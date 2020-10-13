import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Connection } from 'typeorm';
import { runOnTransactionCommit, runOnTransactionComplete, runOnTransactionRollback, Transactional } from 'typeorm-transactional-cls-hooked';
import { Dragon, Hero } from '../../../output/entities';
import { DragonRepository, HeroRepository } from '../../repository';
import { KillDragonCommand } from '../command/kill-dragon.command';

function myDeco(): MethodDecorator {
  Logger.log('실행되나?');
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    Logger.log(`target: ${JSON.stringify(target)}`);
    Logger.log(`propertyKey: ${JSON.stringify(propertyKey)}`);
    Logger.log(`descriptor: ${JSON.stringify(descriptor)}`);

    const type = Reflect.getMetadata('design:type', target, propertyKey);
    Logger.log(`type: ${JSON.stringify(type)}`);
  };
}

@CommandHandler(KillDragonCommand)
export class KillDragonHandler implements ICommandHandler<KillDragonCommand> {
  private readonly logger = new Logger(KillDragonHandler.name);

  constructor(
    private heroRepository: HeroRepository,
    private dragonRepository: DragonRepository,
    private connection: Connection,
    private publisher: EventPublisher,
  ) {
    this.logger.log('핸들러 생성자');
  }

  // @myDeco()
  @Transactional()

  // @validate
  // @Reflect.metadata('design:type', Number)
  async execute(command: KillDragonCommand) {
    this.logger.log('핸들러 실행');
    const { heroId, dragonId } = command;

    const hero: Hero = this.publisher.mergeObjectContext(await this.heroRepository.findOneOrFail(heroId));
    const dragon: Dragon = await this.dragonRepository.findOneOrFail(dragonId);

    // 이게 가장 베스트 방법인듯
    // this.connection.manager.save()

    hero.killEnemy(dragon);
    hero.commit();

    await this.heroRepository.save(hero);
    await this.dragonRepository.save(dragon);
    // hero.hero_name = 'bbbb';
    // this.commit(hero);

    // this.logger.log(`타입 확인1 ${dragon instanceof Hero}`);
    // this.logger.log(`타입 확인2 ${dragon instanceof Dragon}`);
    // const str = JSON.stringify(this.heroRepository.metadata);
    // this.logger.log(`메타데이터 ${JSON.stringify(this.heroRepository.metadata.name)}`);
    // this.logger.log(`메타데이터 ${JSON.stringify(this.heroRepository.metadata.tableName)}`);
    // this.logger.log(`메타데이터 ${JSON.stringify(this.heroRepository.metadata.target)}`);
    // this.logger.log(`메타데이터 ${JSON.stringify(this.heroRepository.metadata.targetName)}`);
    // this.logger.log(`메타데이터 ${JSON.stringify(this.heroRepository.target)}`);

    // runOnTransactionCommit(() => {
    //   this.logger.log('커밋되었음');
    // });

    // runOnTransactionRollback(() => {
    //   this.logger.log('롤백되었음');
    // });

    // runOnTransactionComplete(() => {
    //   this.logger.log('트랜잭션 끝났음');
    // });
  }

  // @Reflect.metadata('design:aa', Hero)
  commit(...args) {
    args.forEach(v => {
      const type = v.getType();
      this.connection.getRepository(type).save(v);
    });
  }

  // this.commit();

  // const em = new Repository();
  // const repo = new Repository<Hero>();
  // repo.save();

  // 이렇게하면 트랜잭션 또 생김..
  // 즉 전체 스코프랑 트랜잭션 공유 안됨
  // 리포를 쓸려면 무조건 해당 리포에 save해야함
  // await this.connection.manager.save([hero, dragon]);

  // 커낵션을 받아와서 트랜잭션 보장하기
  // async execute(command: KillDragonCommand) {
  //   const queryRunner = this.connection.createQueryRunner();
  //   this.logger.log('핸들러 익스큐트');
  //   const { heroId, dragonId } = command;

  //   const hero: Hero = this.publisher.mergeObjectContext(await queryRunner.manager.getRepository(Hero).findOneOrFail(heroId));
  //   const dragon: Dragon = await queryRunner.manager.getRepository(Dragon).findOneOrFail(dragonId);

  //   hero.killEnemy(dragon);

  //   await queryRunner.manager.save([hero, dragon]);
  // }

  // async execute(command: KillDragonCommand) {
  //   this.logger.log('핸들러 익스큐트');
  //   const { heroId } = command;

  //   const hero: Hero = await this.heroRepository.findOneOrFail(heroId);
  //   const items: Array<Inventory> = await hero.items;
  //   this.logger.log(`히어로의 아이템: ${JSON.stringify(items)}`);

  //   const hero2: Hero = await this.heroRepository.findOneOrFail(heroId);
  //   const items2: Array<Inventory> = await hero2.items;
  //   this.logger.log(`히어로의 아이템: ${JSON.stringify(items2)}`);
  // }
}

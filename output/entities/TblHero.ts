import { Logger } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { Column, Entity, OneToMany } from 'typeorm';
import { Enemy } from '.';
import { HeroKilledDragonEvent } from '../../src/heroes-game/event/hero-killed-dragon.event';
import { Inventory } from './TblInventory';

@Entity('tbl_hero', { schema: 'kim_test' })
export class Hero extends AggregateRoot {
  private readonly logger = new Logger(Hero.name);

  @Column('int', { primary: true, name: 'hero_id' })
  hero_id: number;

  @Column('varchar', { name: 'hero_name', length: 45 })
  hero_name: string;

  @Column('int', {
    name: 'enemy_kill_count',
    nullable: true,
    unsigned: true,
    default: () => "'0'",
  })
  enemy_kill_count: number | null;

  // 번역들
  @OneToMany(
    () => Inventory,
    t => t.hero,
  )
  items: Promise<Inventory[]>;

  killEnemy(enemy: Enemy) {
    this.logger.log('몬스터 잡음');
    this.enemy_kill_count += 1;
    enemy.death();

    this.apply(new HeroKilledDragonEvent(this.hero_id, enemy));
  }
}

import { Column } from 'typeorm';

export abstract class Enemy {
  @Column('tinyint', { name: 'is_alive', width: 1, default: () => "'1'" })
  is_alive: number;

  death() {
    this.is_alive = 0;
  }

  abstract toString(): string;
}

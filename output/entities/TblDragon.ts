// import { AggregateRoot } from '@nestjs/cqrs';
import { Column, Entity } from 'typeorm';
import { Enemy } from '.';

@Entity('tbl_dragon', { schema: 'kim_test' })
export class Dragon extends Enemy {
  @Column('int', { primary: true, name: 'dragon_id' })
  dragon_id: number;

  @Column('varchar', { name: 'dragon_name', length: 45 })
  dragon_name: string;

  toString() {
    return this.dragon_name;
  }

  death() {
    super.death();
    // this.dragon_id = -1;
  }

  // @Column('tinyint', { name: 'is_alive', width: 1, default: () => "'1'" })
  // is_alive: boolean;

  // death() {
  //   this.is_alive = false;
  // }
}

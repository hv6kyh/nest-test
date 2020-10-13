import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Hero } from './TblHero';

@Entity('tbl_inventory', { schema: 'kim_test' })
export class Inventory {
  @PrimaryGeneratedColumn({ type: 'int', name: 'item_id', unsigned: true })
  item_id: number;

  @Column('int', { name: 'hero_id', unsigned: true })
  hero_id: number;

  @Column('varchar', { name: 'item_name', length: 50 })
  item_name: string;

  @ManyToOne(
    () => Hero,
    t => t.items,
  )
  @JoinColumn([{ name: 'hero_id', referencedColumnName: 'hero_id' }])
  hero: Promise<Hero>;
}

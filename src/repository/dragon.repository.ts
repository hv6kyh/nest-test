import { EntityRepository, Repository } from 'typeorm';
import { Dragon } from '../../output/entities/TblDragon';

@EntityRepository(Dragon)
export class DragonRepository extends Repository<Dragon> {}

import { EntityRepository, Repository } from 'typeorm';
import { Photo } from '../../output/entities/TblPhoto';

@EntityRepository(Photo)
export class PhotoRepository extends Repository<Photo> {}

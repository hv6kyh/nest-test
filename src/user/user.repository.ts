import { EntityRepository, Repository } from 'typeorm';
import { User } from '../../output/entities/TblUser';

@EntityRepository(User)
export class UserRepository extends Repository<User> {}

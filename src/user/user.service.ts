/* eslint-disable @typescript-eslint/camelcase */
import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Connection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Photo } from '../../output/entities/TblPhoto';
import { User } from '../../output/entities/TblUser';
import { PhotoRepository } from '../photo/photo.repository';
import { UserRepository } from './user.repository';
import { AuthToken, Login, LoginUserInfo, Register, UserInfo } from './user.type';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly photoRepository: PhotoRepository,
    private jwtService: JwtService,
    private readonly connection: Connection,
    private readonly connection2: Connection,
  ) {}

  public async addUser(register: Register): Promise<UserInfo> {
    await this.connection2.transaction(async manager => {
      const newPhoto = await this.photoRepository.create();

      newPhoto.fileName = `${register.name}anotherConnection.jpg`;

      await manager.save(newPhoto);
    });

    // 쿼리 러너 정의
    const queryRunner = this.connection.createQueryRunner();

    // 트랜잭션 시작
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newPhoto = await this.photoRepository.create();

      newPhoto.fileName = `${register.name}_profile.jpg`;

      const photo = await this.photoRepository.save(newPhoto);

      const newUser = await this.userRepository.create();

      newUser.email = register.email;
      newUser.name = register.name;
      newUser.password = register.password;
      newUser.uuid = uuidv4();
      newUser.photoId = photo.photoId;

      const user = await this.userRepository.save(newUser);

      // 트랜잭션 종료
      await queryRunner.commitTransaction();

      const userInfo: UserInfo = {
        userId: user.userId,
        email: user.email,
        name: user.name,
        uuid: user.uuid,
      };

      return userInfo;
    } catch (error) {
      // 트랜잭션 롤백
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async login(loginUser: Login): Promise<AuthToken> {
    const user: User = await this.userRepository.findOne({
      where: {
        email: loginUser.email,
      },
    });

    const passwordCheck = loginUser.password === user.password;

    if (!passwordCheck) {
      return null;
    }

    user.lastLoginDate = new Date();

    await this.userRepository.save(user);

    const payload = {
      user_id: user.userId,
      email: user.email,
      name: user.name,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  public async getUser(userId: number): Promise<LoginUserInfo> {
    try {
      // const user: User = await this.userRepository.findOne(userId);
      const user = await this.userRepository
        .createQueryBuilder('u')
        .leftJoinAndSelect(Photo, 'p', 'u.photo_id = p.photo_id')
        .where('u.user_id = :userId', { userId })
        .getOne();

      Logger.log(`조인 결과: ${JSON.stringify(user)}`);

      if (!user) {
        throw new Error('유저 없음');
      }

      const userInfo: LoginUserInfo = {
        email: user.email,
        name: user.name,
        uuid: user.uuid,
        lastLoginDt: user.lastLoginDate,
        photoFileName: '',
      };

      return userInfo;
    } catch (error) {
      throw error;
    }
  }
}

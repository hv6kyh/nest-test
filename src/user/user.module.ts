import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoRepository } from '../photo/photo.repository';
import { JwtStrategy } from '../util/jwt.strategy';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserSubscriber } from './user-subscriber';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    TypeOrmModule.forFeature([PhotoRepository]),
    JwtModule.register({
      secret: 'rockko',
      signOptions: { expiresIn: '1800s' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy, UserSubscriber],
})
export class UserModule {}

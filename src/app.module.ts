import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhotoService } from './photo/photo.service';
import { TestModule } from './test/test.module';
import { UserModule } from './user/user.module';
import { MyMiddle } from './util/my.middle';
import { HeroesGameModule } from './heroes-game/heroes-game.module';

@Module({
  imports: [TypeOrmModule.forRoot(), TestModule, UserModule, HeroesGameModule],
  controllers: [AppController],
  providers: [AppService, PhotoService],
})

/**
 * 미들웨어 탈려면 NestModule 구현해야 함
 */
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MyMiddle).forRoutes('user');
  }
}

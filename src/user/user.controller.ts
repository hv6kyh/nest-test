import { Body, Controller, Get, HttpStatus, Logger, Param, Post, UseGuards, UsePipes } from '@nestjs/common';
import { User } from 'src/decorator/user.decorator';
import { JwtAuthGuard } from '../util/jwt.auth.guard';
import { MyAuthGuard } from '../util/my.auth.guard';
import { MyException } from '../util/my.exception';
// import { MyExceptionFilter } from '../util/my.exception.filter';
import { MyPipe } from '../util/my.pipe';
// import { User } from '../util/user.decorator';
import { loginSchema, registerSchema } from './user.schema';
import { UserService } from './user.service';
import { AuthToken, Login, LoginUserInfo, Register, UserInfo } from './user.type';

// Exception이 발생하면 이 필터가 받아서 response 정의함
// 가능하면 인스턴스 대신 클래스를 사용하여 필터를 적용하는 것이 좋습니다.
// Nest가 전체 모듈에서 동일한 클래스의 인스턴스를 쉽게 재사용 할 수 있으므로 메모리 사용량 이 줄어 듭니다 .

// 인스턴스를 생성해서 넣으면 메모리 낭비
// 클래스를 사용하면 싱글톤인듯
// @UseGuards(new MyAuthGuard())
@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Post('register')
  @UsePipes(new MyPipe(registerSchema))
  public async addUser(@Body() register: Register): Promise<UserInfo> {
    try {
      this.logger.log('회원가입 컨트롤러 발 담금');

      const user: UserInfo = await this.userService.addUser(register);

      // this.nestEventEmitter.emit('new-user', user);

      return user;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  @Post('login')
  @UsePipes(new MyPipe(loginSchema))
  public async login(@Body() login: Login): Promise<AuthToken> {
    try {
      this.logger.log('로그인 컨트롤러 발 담금');

      const token = await this.userService.login(login);

      return token;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  @Get(':user_id')
  @UseGuards(new JwtAuthGuard(), new MyAuthGuard())
  public async getUser(@User() userDTO, @Param() param): Promise<LoginUserInfo> {
    try {
      const user: LoginUserInfo = await this.userService.getUser(param.user_id);
      this.logger.log(`req.user:${JSON.stringify(userDTO)}`);

      if (!user) {
        throw new MyException(HttpStatus.NOT_FOUND, '해당 유저 정보 없음');
      }

      return user;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

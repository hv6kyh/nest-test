import { Injectable, Logger } from '@nestjs/common';
import { On } from 'nest-event';
import { UserInfo } from '../user/user.type';

@Injectable()
export class EmailService {
  @On('new-user')
  sendEmail1(userInfo: UserInfo) {
    Logger.log('신규 유저 생성됨: ' + JSON.stringify(userInfo));
  }

  @On('new-reservation')
  sendEmail2() {
    Logger.log('예약 생성됨');
  }

  @On('cancel-reservation')
  sendEmail3() {
    Logger.log('예약 취소됨');
  }
}

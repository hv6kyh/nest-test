import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    Logger.log('데코레이터 user: ' + JSON.stringify(user));
    Logger.log('데코레이터 data: ' + data);

    // return data ? user[data] : user;
    return data ? user && user[data] : user;
  },
);

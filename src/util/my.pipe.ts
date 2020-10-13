import { ObjectSchema } from '@hapi/joi';
import {
  ArgumentMetadata,
  HttpStatus,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { MyException } from './my.exception';

// 파이프의 사용은
// 파라미터 유효성 검사
// 혹은 폼 변경에 사용한다
@Injectable()
export class MyPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}
  transform(value: any, metadata: ArgumentMetadata) {
    Logger.log('파이프 탔음');
    Logger.log('파이프 value: ' + JSON.stringify(value));
    Logger.log('파이프 metadata: ' + JSON.stringify(metadata));

    const { error } = this.schema.validate(value);
    if (error) {
      throw new MyException(
        HttpStatus.BAD_REQUEST,
        '파라미터 오류 파이프에서 검증',
      );
    }

    return value;
  }
}

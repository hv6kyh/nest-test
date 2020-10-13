import {
  ArgumentMetadata,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';

// jwt에서 데이터 파싱
@Injectable()
export class AuthPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    Logger.log('Auth 파이프 탔음');
    Logger.log('Auth value:', JSON.stringify(value));

    return value;
  }
}

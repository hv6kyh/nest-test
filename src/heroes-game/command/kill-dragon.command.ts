import { Logger } from '@nestjs/common';

export class KillDragonCommand {
  private readonly logger = new Logger(KillDragonCommand.name);

  constructor(public readonly heroId: number, public readonly dragonId: number) {
    this.logger.log('커맨트 생성됨');
  }
}

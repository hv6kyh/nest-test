import { Test, TestingModule } from '@nestjs/testing';
import { UserSubscriber } from './user-subscriber';

describe('UserSubscriber', () => {
  let provider: UserSubscriber;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserSubscriber],
    }).compile();

    provider = module.get<UserSubscriber>(UserSubscriber);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});

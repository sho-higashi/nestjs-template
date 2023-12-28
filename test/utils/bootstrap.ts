import { Test, TestingModule } from '@nestjs/testing';

import { UserModule } from '../../src/modules/domain/user/user.module';

export const bootstrap = async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [UserModule],
  }).compile();

  const app = moduleFixture.createNestApplication();

  await app.init();

  return {
    app,
  };
};

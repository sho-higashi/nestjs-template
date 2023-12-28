import { INestApplication } from '@nestjs/common';

import { bootstrap, cleanup, createRequester, Requester } from './utils';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  let getRequester: Requester;

  beforeAll(async () => {
    const nestApp = await bootstrap();
    app = nestApp.app;
    getRequester = createRequester(app);
  });

  afterEach(async () => {
    await cleanup();
  });

  it('/ (GET)', async () => {
    const res = await getRequester('/');

    expect(res.status).toBe(200);
    expect(res.text).toEqual('Hello World!');
  });
});

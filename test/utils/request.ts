import { INestApplication } from '@nestjs/common';
import request from 'supertest';

export const createRequester = (app: INestApplication) => {
  return (path: string) => request(app.getHttpServer()).get(path);
};

export type Requester = ReturnType<typeof createRequester>;

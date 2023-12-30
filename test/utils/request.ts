import { INestApplication } from '@nestjs/common';
import request from 'supertest';

export const createRestRequest = (app: INestApplication) => {
  return <TVariables extends object | undefined, TResponse extends object>(
    path: string,
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    variables?: TVariables,
    token?: string,
  ): Promise<{
    body: TResponse;
    status: number;
    text?: string;
  }> => {
    const requestTest = request(app.getHttpServer())[method](path);
    if (token) {
      requestTest.set({ Authorization: `Bearer ${token}` });
    }

    return requestTest.send(variables ?? {});
  };
};

export type RestRequest = ReturnType<typeof createRestRequest>;

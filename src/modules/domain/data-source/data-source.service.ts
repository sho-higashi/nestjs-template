import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ durable: true, scope: Scope.REQUEST })
export class DataSourceService {
  constructor(@Inject(REQUEST) private readonly request: Request) {}
}

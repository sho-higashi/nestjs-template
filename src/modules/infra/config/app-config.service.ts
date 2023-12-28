import { Injectable } from '@nestjs/common';
import { ConfigService, Path, PathValue } from '@nestjs/config';

import { Environment } from '../../../utils';

@Injectable()
export class AppConfigService extends ConfigService<Environment, true> {
  // eslint-disable-next-line no-use-before-define
  get<P extends Path<T>, T = Environment>(arg: P): PathValue<T, P> {
    return super.get<T, P, PathValue<T, P>>(arg, { infer: true });
  }
}

import { Inject, Module } from '@nestjs/common';

import {
  ConfigurableModuleClass,
  HTTP_MODULE_OPTIONS,
  HttpModuleOptions,
} from './http-client.module-definition';

@Module({})
export class HttpClientModule extends ConfigurableModuleClass {
  constructor(
    @Inject(HTTP_MODULE_OPTIONS)
    private options: HttpModuleOptions,
  ) {
    super();
  }
}

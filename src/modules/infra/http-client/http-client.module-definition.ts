import { ConfigurableModuleBuilder } from '@nestjs/common';

export type HttpModuleOptions = {
  baseUrl?: string;
};

export const {
  ASYNC_OPTIONS_TYPE,
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN: HTTP_MODULE_OPTIONS,
  OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<HttpModuleOptions>()
  // .setClassMethodName('forRoot')
  // .setFactoryMethodName('resolve')
  .setExtras<{ isGlobal?: boolean }>(
    {
      isGlobal: true,
    },
    (definition, extras) => ({ ...definition, global: extras.isGlobal }),
  )
  .build();

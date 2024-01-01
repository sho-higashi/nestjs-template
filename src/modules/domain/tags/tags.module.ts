import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';

import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

@Module({
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule implements OnApplicationBootstrap {
  constructor(private readonly moduleRef: ModuleRef) {}

  async onApplicationBootstrap() {
    const contextId = ContextIdFactory.create();
    // const tagService1 = await this.moduleRef.resolve(TagsService, contextId);
    // const tagService2 = await this.moduleRef.resolve(TagsService, contextId);
    // // eslint-disable-next-line no-console
    // console.log(tagService1 === tagService2); // true

    this.moduleRef.registerRequestByContextId({ hello: 'world' }, contextId);
  }
}

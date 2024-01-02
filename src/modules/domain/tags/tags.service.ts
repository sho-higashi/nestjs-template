import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable({ scope: Scope.REQUEST })
export class TagsService {
  constructor(@Inject(REQUEST) request: unknown) {
    // eslint-disable-next-line no-console
    console.log(request);
  }

  create(createTagDto: CreateTagDto) {
    // eslint-disable-next-line no-console
    console.log(createTagDto);

    return 'This action adds a new tag';
  }

  findAll() {
    return `This action returns all tags`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    // eslint-disable-next-line no-console
    console.log(updateTagDto);

    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}

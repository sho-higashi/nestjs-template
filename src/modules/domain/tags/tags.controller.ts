import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

import { ErrorResponse } from '../../../dto';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @ApiOperation({ summary: 'TBW' })
  @ApiOkResponse({ type: String })
  @ApiBadRequestResponse({ type: ErrorResponse })
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @Get()
  @ApiOperation({ summary: 'TBW' })
  @ApiOkResponse({ type: String })
  @ApiBadRequestResponse({ type: ErrorResponse })
  findAll() {
    return this.tagsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'TBW' })
  @ApiOkResponse({ type: String })
  @ApiBadRequestResponse({ type: ErrorResponse })
  findOne(@Param('id') id: string) {
    return this.tagsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'TBW' })
  @ApiOkResponse({ type: String })
  @ApiBadRequestResponse({ type: ErrorResponse })
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.update(+id, updateTagDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'TBW' })
  @ApiOkResponse({ type: String })
  @ApiBadRequestResponse({ type: ErrorResponse })
  remove(@Param('id') id: string) {
    return this.tagsService.remove(+id);
  }
}

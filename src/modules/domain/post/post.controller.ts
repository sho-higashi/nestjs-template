import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { AuthUser } from '../../../interfaces';
import { CurrentUser } from '../user/user.decorator';
import { UserGuard } from '../user/user.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { ListPostDto, ListPostResponse } from './dto/list-post.dto';
import { PostResponse } from './dto/post.dto';
import { RemovePostsDto, RemovePostsResponse } from './dto/remove-posts.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';

@UseGuards(UserGuard)
@Controller('posts')
export class PostController {
  constructor(private readonly service: PostService) {}

  @Get()
  listPost(
    @CurrentUser() user: AuthUser,
    @Query() dto: ListPostDto,
  ): Promise<ListPostResponse> {
    return this.service.list(user, dto);
  }

  @Get(':id')
  getPost(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
  ): Promise<PostResponse> {
    return this.service.get(user, id);
  }

  @HttpCode(200)
  @Post()
  createPost(
    @CurrentUser() user: AuthUser,
    @Body() dto: CreatePostDto,
  ): Promise<PostResponse> {
    return this.service.create(user, dto);
  }

  @Put(':id')
  putPost(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() dto: UpdatePostDto,
  ): Promise<PostResponse> {
    return this.service.update(user, id, dto);
  }

  @Delete()
  removePosts(
    @CurrentUser() user: AuthUser,
    @Body() dto: RemovePostsDto,
  ): Promise<RemovePostsResponse> {
    return this.service.removeMany(user, dto);
  }
}

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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { DOCUMENT_JWT_AUTH_NAME } from '../../../consts';
import { ErrorResponse } from '../../../entities';
import { AuthUser } from '../../../interfaces';
import { CurrentUser } from '../user/user.decorator';
import { UserGuard } from '../user/user.guard';
import {
  CreatePostDto,
  ListPostDto,
  RemovePostsDto,
  RemovePostsResponse,
  UpdatePostDto,
} from './dto';
import { ListPostResponse, PostResponse } from './entities';
import { PostService } from './post.service';

@ApiTags('posts')
@ApiBearerAuth(DOCUMENT_JWT_AUTH_NAME)
@UseGuards(UserGuard)
@Controller('posts')
export class PostController {
  constructor(private readonly service: PostService) {}

  @Get()
  @ApiOperation({ summary: "get requested user's posts" })
  @ApiOkResponse({ type: ListPostResponse })
  @ApiForbiddenResponse({ type: ErrorResponse })
  @ApiBadRequestResponse({ type: ErrorResponse })
  listPost(
    @CurrentUser() user: AuthUser,
    @Query() dto: ListPostDto,
  ): Promise<ListPostResponse> {
    return this.service.list(user, dto);
  }

  @Get(':id')
  @ApiOperation({ summary: "get requested user's post" })
  @ApiOkResponse({ type: PostResponse })
  @ApiForbiddenResponse({ type: ErrorResponse })
  @ApiNotFoundResponse({ type: ErrorResponse })
  getPost(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
  ): Promise<PostResponse> {
    return this.service.get(user, id);
  }

  @HttpCode(200)
  @ApiOperation({ summary: "create requested user's post" })
  @ApiBody({ type: CreatePostDto })
  @ApiOkResponse({ type: PostResponse })
  @ApiForbiddenResponse({ type: ErrorResponse })
  @ApiBadRequestResponse({ type: ErrorResponse })
  @Post()
  createPost(
    @CurrentUser() user: AuthUser,
    @Body() dto: CreatePostDto,
  ): Promise<PostResponse> {
    return this.service.create(user, dto);
  }

  @Put(':id')
  @ApiOperation({ summary: "update requested user's post" })
  @ApiBody({ type: UpdatePostDto })
  @ApiOkResponse({ type: PostResponse })
  @ApiForbiddenResponse({ type: ErrorResponse })
  @ApiNotFoundResponse({ type: ErrorResponse })
  @ApiBadRequestResponse({ type: ErrorResponse })
  putPost(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() dto: UpdatePostDto,
  ): Promise<PostResponse> {
    return this.service.update(user, id, dto);
  }

  @Delete()
  @ApiOperation({ summary: "delete requested user's posts" })
  @ApiBody({ type: RemovePostsDto })
  @ApiOkResponse({ type: PostResponse })
  @ApiForbiddenResponse({ type: ErrorResponse })
  @ApiNotFoundResponse({ type: ErrorResponse })
  removePosts(
    @CurrentUser() user: AuthUser,
    @Body() dto: RemovePostsDto,
  ): Promise<RemovePostsResponse> {
    return this.service.removeMany(user, dto);
  }
}

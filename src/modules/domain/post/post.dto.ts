import { Post } from '@prisma/client';

export class PostDto implements Post {
  id!: string;

  userId!: string;

  title!: string;

  body!: string;

  createdAt!: Date;

  updatedAt!: Date;
}

export class ListPostRequestDto {
  limit?: number | null;

  offset?: number | null;
}

export class ListPostResponseDto {
  posts!: PostDto[];

  totalCount!: number;
}

export class CreatePostRequestDto {
  title!: string;

  body!: string;
}

export class UpdatePostRequestDto {
  id!: string;

  title?: string | null;

  body?: string | null;
}

export class RemovePostsRequestDto {
  ids!: string[];
}

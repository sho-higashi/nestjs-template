import { PostResponse } from './post.dto';

export class ListPostDto {
  limit?: number | null;

  offset?: number | null;

  order?: 'asc' | 'desc' | null;

  orderBy?: 'createdAt' | 'updatedAt' | null;
}

export class ListPostResponse {
  posts!: PostResponse[];

  totalCount!: number;

  limit!: number;

  offset!: number;
}

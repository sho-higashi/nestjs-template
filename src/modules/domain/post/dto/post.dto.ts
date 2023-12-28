import { Post } from '../../../infra/prisma/prisma';

export class PostResponse implements Post {
  id!: string;

  authorId!: string;

  title!: string;

  content!: string;

  createdAt!: Date;

  updatedAt!: Date;

  removedAt!: Date | null;
}

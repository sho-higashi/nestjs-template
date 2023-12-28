import { Post } from '../../../infra/prisma/prisma';

export class PostResponse implements Post {
  id!: string;

  userId!: string;

  title!: string;

  body!: string;

  createdAt!: Date;

  updatedAt!: Date;

  removedAt!: Date | null;
}

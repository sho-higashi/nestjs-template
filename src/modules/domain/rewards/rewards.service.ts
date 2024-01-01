import { Injectable } from '@nestjs/common';

@Injectable()
export class RewardsService {
  grantTo() {
    // eslint-disable-next-line no-console
    console.log('Granting rewards to a user...');

    return 'This action grants rewards to a user';
  }
}

import { Logger } from '@nestjs/common';

import { Interval } from './decorators/interval.decorator';
import { IntervalHost } from './decorators/interval-host-key.decorator';

@IntervalHost
export class CronService {
  #logger = new Logger(CronService.name);

  @Interval(30000) // 👈
  everySecond() {
    this.#logger.log({
      message: 'This will be logged every 30 second 🐈 ',
    });
  }
}

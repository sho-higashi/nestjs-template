import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher } from '@nestjs/cqrs';

import { AlarmFactory } from '../../domain/factories/alarm.factory';
import { CreateAlarmCommand } from './create-alarm.command';

@CommandHandler(CreateAlarmCommand)
export class CreateAlarmCommandHandler {
  private readonly logger = new Logger(CreateAlarmCommandHandler.name);

  constructor(
    private readonly alarmFactory: AlarmFactory,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: CreateAlarmCommand) {
    this.logger.log(
      'CreateAlarmCommandHandler.execute()',
      JSON.stringify(command, null, 2),
    );

    const alarm = this.alarmFactory.create(
      command.name,
      command.severity,
      command.triggeredAt,
      command.items,
    );

    this.eventPublisher.mergeObjectContext(alarm);
    alarm.commit();

    return alarm;
  }
}

import { Logger } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';

import { AlarmReadModel } from '../../domain/read-models/alarm.read-model';
import { FindAlarmsRepository } from '../ports/find-alarms.repository';
import { GetAlarmsQuery } from './get-alarms.query';

@QueryHandler(GetAlarmsQuery)
export class GetAlarmsCommandHandler {
  private readonly logger = new Logger(GetAlarmsCommandHandler.name);

  constructor(private readonly alarmsRepository: FindAlarmsRepository) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(_query: GetAlarmsQuery): Promise<AlarmReadModel[]> {
    return this.alarmsRepository.findAll();
  }
}

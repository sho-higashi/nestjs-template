import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../../../infra/prisma/prisma.service';
import { CreateAlarmRepository } from '../../../../application/ports/create-alarm.repository';
import { Alarm } from '../../../../domain/alarm';
import { AlarmMapper } from '../mappers/alarm.mapper';

@Injectable()
export class OrmCreateAlarmRepository implements CreateAlarmRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(alarm: Alarm): Promise<Alarm> {
    const created = await this.prisma.alarm.create({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: AlarmMapper.toPersistence(alarm) as any,
      include: { AlarmItem: true },
    });

    return AlarmMapper.toDomain(created);
  }
}

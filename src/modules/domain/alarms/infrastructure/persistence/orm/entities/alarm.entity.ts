import { AlarmSeverity } from '../../../../../..//infra/prisma/prisma';
import { AlarmItemEntity } from './alarm-item.entity';

export class AlarmEntity {
  AlarmItem!: AlarmItemEntity[];

  id!: string;

  isAcknowledged!: boolean;

  name!: string;

  severity!: AlarmSeverity;

  triggeredAt!: Date;
}

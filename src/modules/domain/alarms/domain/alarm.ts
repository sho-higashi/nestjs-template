import { VersionedAggregateRoot } from '../../../../shared/domain/aggregate-root';
import { AlarmSeverity } from './value-objects/alarm.severity';
import { AlarmItem } from './value-objects/alarm-item.entity';

export class Alarm extends VersionedAggregateRoot {
  public isAcknowledged!: boolean;

  public items: AlarmItem[] = [];

  public name!: string;

  public severity!: AlarmSeverity;

  public triggeredAt!: Date;

  constructor(public readonly id: string) {
    super();
  }

  acknowledge(): void {
    this.isAcknowledged = true;
  }

  addAlarmItem(item: AlarmItem): void {
    this.items.push(item);
  }
}

import { AlarmSeverity } from '../value-objects/alarm.severity';

export class AlarmReadModel {
  public id!: string;

  public items!: { name: string; type: string }[];

  public name!: string;

  public severity!: AlarmSeverity;

  public triggeredAt!: Date;
}

export class CreateAlarmDto {
  items!: Array<{ name: string; type: string }>;

  name!: string;

  severity!: string;

  triggeredAt!: Date;
}

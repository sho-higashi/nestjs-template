import { ApiProperty } from '@nestjs/swagger';

export class PaymentWebhookResponse {
  @ApiProperty({
    type: Boolean,
  })
  success!: boolean;
}

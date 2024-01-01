import { Module } from '@nestjs/common';

import { CoffeesController } from './coffees.controller';
import { COFFEE_DATA_SOURCE, CoffeesService } from './coffees.service';

@Module({
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    {
      provide: COFFEE_DATA_SOURCE,
      useValue: [],
    },
  ],
})
export class CoffeesModule {}

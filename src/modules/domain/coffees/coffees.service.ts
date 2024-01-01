import { Inject, Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';

import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

export const COFFEE_DATA_SOURCE = Symbol('COFFEE_DATA_SOURCE');

export interface CoffeeDataSource {
  [index: number]: Coffee;
}

@Injectable()
export class CoffeesService {
  constructor(
    @Inject(COFFEE_DATA_SOURCE)
    private readonly dataSource: CoffeeDataSource,
    private readonly lazyModuleLoader: LazyModuleLoader,
  ) {}

  async create(createCoffeeDto: CreateCoffeeDto) {
    // eslint-disable-next-line no-console
    console.log(createCoffeeDto);
    // eslint-disable-next-line no-console
    console.time();
    const lazyModuleLoaderRef = await this.lazyModuleLoader.load(() =>
      import('../rewards/rewards.module').then(
        (module) => module.RewardsModule,
      ),
    );

    const { RewardsService } = await import('../rewards/rewards.service');
    const rewardsService = lazyModuleLoaderRef.get(RewardsService);
    // eslint-disable-next-line no-console
    console.timeEnd();

    return rewardsService.grantTo();
  }

  findAll() {
    return `This action returns all coffees`;
  }

  findOne(id: number) {
    return `This action returns a #${id} coffee`;
  }

  update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    // eslint-disable-next-line no-console
    console.log(updateCoffeeDto);

    return `This action updates a #${id} coffee`;
  }

  remove(id: number) {
    return `This action removes a #${id} coffee`;
  }
}

import { Injectable, Scope } from '@nestjs/common';

import { DataSourceService } from '../data-source/data-source.service';
import { CreateAccountUserDto } from './dto/create-account-user.dto';
import { UpdateAccountUserDto } from './dto/update-account-user.dto';

@Injectable({ scope: Scope.REQUEST })
export class AccountUsersService {
  constructor(private readonly dataSourceService: DataSourceService) {}

  create(createAccountUserDto: CreateAccountUserDto) {
    // eslint-disable-next-line no-console
    console.log(createAccountUserDto);

    return 'This action adds a new accountUser';
  }

  findAll() {
    // eslint-disable-next-line no-console
    console.log(this.dataSourceService);

    return `This action returns all accountUsers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} accountUser`;
  }

  update(id: number, updateAccountUserDto: UpdateAccountUserDto) {
    // eslint-disable-next-line no-console
    console.log(updateAccountUserDto);

    return `This action updates a #${id} accountUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} accountUser`;
  }
}

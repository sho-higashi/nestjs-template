import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { ErrorResponse } from '../../../../../dto';
import { AlarmsService } from '../../application/alarms.service';
import { CreateAlarmCommand } from '../../application/commands/create-alarm.command';
import { CreateAlarmDto } from './dto/create-alarm.dto';
import { Alarm } from './entities/alarm.entity';

@ApiTags('alarms')
@Controller('alarms')
export class AlarmsController {
  constructor(private readonly alarmsService: AlarmsService) {}

  @Post()
  @ApiOperation({ summary: 'create alarm' })
  @ApiOkResponse({ type: Alarm })
  @ApiBadRequestResponse({ type: ErrorResponse })
  @ApiBody({ type: CreateAlarmDto })
  create(@Body() createAlarmDto: CreateAlarmDto) {
    return this.alarmsService.create(
      new CreateAlarmCommand(
        createAlarmDto.name,
        createAlarmDto.severity,
        createAlarmDto.triggeredAt,
        createAlarmDto.items,
      ),
    );
  }

  @Get()
  @ApiOperation({ summary: 'get alarms' })
  @ApiOkResponse({ type: [Alarm] })
  @ApiBadRequestResponse({ type: ErrorResponse })
  findAll() {
    return this.alarmsService.findAll();
  }
}

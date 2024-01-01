import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  RequestTimeoutException,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

// import { EntityExistsPipe } from '../../../common/pipes/entity-exists/entity-exists.pipe';
import { ErrorResponse } from '../../../dto';
import { CircuitBreakerInterceptor } from '../../../interceptors';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@UseInterceptors(CircuitBreakerInterceptor)
@ApiTags('posts')
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Post()
  @ApiOperation({ summary: 'create coffee' })
  @ApiOkResponse({ type: String })
  @ApiBadRequestResponse({ type: ErrorResponse })
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto);
  }

  @Get()
  @ApiOperation({ summary: 'get coffees' })
  @ApiOkResponse({ type: String })
  @ApiBadRequestResponse({ type: ErrorResponse })
  findAll() {
    // eslint-disable-next-line no-console
    console.log('findAll executed');
    throw new RequestTimeoutException('timeout');
    // return this.coffeesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'get coffee' })
  @ApiOkResponse({ type: String })
  @ApiBadRequestResponse({ type: ErrorResponse })
  findOne(@Param('id') id: string) {
    return this.coffeesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update coffee' })
  @ApiOkResponse({ type: String })
  @ApiBadRequestResponse({ type: ErrorResponse })
  update(
    // @Param('id', EntityExistsPipe(Coffee)) id: string,
    @Param('id') id: string,
    @Body() updateCoffeeDto: UpdateCoffeeDto,
  ) {
    return this.coffeesService.update(+id, updateCoffeeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete coffee' })
  @ApiOkResponse({ type: String })
  @ApiBadRequestResponse({ type: ErrorResponse })
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(+id);
  }
}

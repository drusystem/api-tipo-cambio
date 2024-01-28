import { Controller, Get, Post, Body, Patch, Query, UseGuards } from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { CreateExchangeDto } from './dto/create-exchange.dto';
import { UpdateExchangeDto } from './dto/update-exchange.dto';
import { CalculateExchangeDto } from './dto/calculate-exchange.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Tipo de Cambio')
@ApiBearerAuth()
@Controller('exchange')
@UseGuards(AuthGuard)
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @Post()
  create(@Body() createExchangeDto: CreateExchangeDto) {
    console.log(createExchangeDto)
    return this.exchangeService.create(createExchangeDto);
  }

  @Get('calculate')
  calculate(@Query() calculateExchangeDto: CalculateExchangeDto) {
    return this.exchangeService.calculateMount(calculateExchangeDto);
  }

  @Patch()
  update(@Body() updateExchangeDto: UpdateExchangeDto) {
    return this.exchangeService.update(updateExchangeDto);
  }
}

import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateExchangeDto } from './dto/create-exchange.dto';
import { UpdateExchangeDto } from './dto/update-exchange.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Exchange } from './entities/exchange.entity';
import { Repository } from 'typeorm';
import { RedisService } from '../memoryDB/redis.service';
import { ExchangeType } from './types/exchange.type';
import { ExchangeCalculateType } from './types/exchangeCalculate.type';
import { CalculateExchangeDto } from './dto/calculate-exchange.dto';


@Injectable()
export class ExchangeService {

  constructor(
      @InjectRepository(Exchange) private readonly ExchangeRepository:Repository<Exchange>,
      private cacheService:RedisService
  ){}

  generateKey(exchangeData:ExchangeType):string{
    const {moneda_origen,moneda_destino,tipo_cambio} = exchangeData
    if(!moneda_origen || !moneda_destino || !tipo_cambio){
      throw new BadRequestException()
    }
    return `${moneda_origen}-${moneda_destino}`
  }

  async create(createExchangeDto: CreateExchangeDto):Promise<ExchangeType> {

    const memoryKey = this.generateKey(createExchangeDto);

    const dataExiste = await this.cacheService.get(memoryKey)
    if(dataExiste){
      throw new ConflictException('El tipo de cambio ya existe')
    }

    await this.cacheService.set(memoryKey,createExchangeDto)
    const dataCache:ExchangeType = await this.cacheService.get(memoryKey)

    return dataCache
  }

  async update(updateExchangeDto: UpdateExchangeDto):Promise<ExchangeType> {

    const memoryKey = this.generateKey(updateExchangeDto);

    const dataCache = await this.cacheService.get(memoryKey)
    if(!dataCache){
      throw new NotFoundException('No se encontró el tipo de cambio a actualizar')
    }

    await this.cacheService.set(memoryKey,updateExchangeDto)

    return await this.cacheService.get(memoryKey)

  }

  async calculateMount(calculateExchangeDto:CalculateExchangeDto):Promise<ExchangeCalculateType>{

    const {moneda_origen,moneda_destino,monto} = calculateExchangeDto

    if(!moneda_origen || !moneda_destino || !monto || (typeof monto === 'string')){
      throw new BadRequestException();
    }

    const key = `${moneda_origen}-${moneda_destino}`;
    const dataCache:ExchangeType = await this.cacheService.get(key)
    if(!dataCache){
      throw new NotFoundException('No se encontró el tipo de cambio requerido')
    }
    const dataCalculada:ExchangeCalculateType = {
      monto,
      monto_tipo_cambio:(monto*dataCache.tipo_cambio),
      moneda_origen,
      moneda_destino,
      tipo_cambio:dataCache.tipo_cambio
    }
    return dataCalculada;
  }
}

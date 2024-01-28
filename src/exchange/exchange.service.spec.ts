import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeService } from './exchange.service';
import { RedisService } from '../memoryDB/redis.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Exchange } from './entities/exchange.entity';
import { CreateExchangeDto } from './dto/create-exchange.dto';
import { BadRequestException } from '@nestjs/common';
import { CalculateExchangeDto } from './dto/calculate-exchange.dto';

describe('ExchangeService', () => {
  let service: ExchangeService;
  let cacheService: RedisService;
  let calculateDtoMock;
  const cacheServiceMock = {
    set:jest.fn(),
    get:jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExchangeService,
        {
          provide:RedisService,
          useFactory:()=>cacheServiceMock
        },
      ],
    }).compile();

    service = module.get<ExchangeService>(ExchangeService);
    cacheService =module.get<RedisService>(RedisService);
    calculateDtoMock = {moneda_origen:'PEN',moneda_destino:'USD',monto:1} as CalculateExchangeDto;
  });

  it('ExchangeService definido', () => {
    expect(service).toBeDefined();
  });

  describe('Método calculateMount()',()=>{
    it('Debe retornar el valor de conversión', async () => {

      (cacheService.get as jest.Mock).mockResolvedValue({
        "moneda_origen": "PEN",
        "moneda_destino": "USD",
        "tipo_cambio": 0.27
      });
      expect(await service.calculateMount(calculateDtoMock)).toEqual({
        "monto": 1,
        "monto_tipo_cambio": 0.27,
        "moneda_origen": "PEN",
        "moneda_destino": "USD",
        "tipo_cambio": 0.27
      });


      (cacheService.get as jest.Mock).mockResolvedValue({
        "moneda_origen": "PEN",
        "moneda_destino": "EUR",
        "tipo_cambio": 0.24
      });
      calculateDtoMock.moneda_destino = 'EUR'
      calculateDtoMock.monto = 13
      expect(await service.calculateMount(calculateDtoMock)).toEqual({
          "monto": 13,
          "monto_tipo_cambio": 3.12,
          "moneda_origen": "PEN",
          "moneda_destino": "EUR",
          "tipo_cambio": 0.24
      });
    });

    it('Debe arrojar error si envía parámetros inválidos',async()=>{
      calculateDtoMock.moneda_origen='';
      await expect(service.calculateMount(calculateDtoMock)).rejects.toThrow(new BadRequestException());

      calculateDtoMock.moneda_origen='PEN';
      calculateDtoMock.moneda_destino='';
      await expect(service.calculateMount(calculateDtoMock)).rejects.toThrow(new BadRequestException());

      calculateDtoMock.moneda_origen='PEN';
      calculateDtoMock.moneda_destino='USD';
      calculateDtoMock.monto='MONTO';
      await expect(service.calculateMount(calculateDtoMock)).rejects.toThrow(new BadRequestException());
    })
  })


  // describe('Método create()',()=>{
  //   it('Debe arrojar error si envía parámetros inválidos',async()=>{
  //     createDtoMock.moneda_origen='';
  //     await expect(service.create(createDtoMock)).rejects.toThrow(new BadRequestException());

  //     createDtoMock.moneda_origen='PEN';
  //     createDtoMock.moneda_destino='';
  //     await expect(service.create(createDtoMock)).rejects.toThrow(new BadRequestException());

  //     createDtoMock.moneda_origen='PEN';
  //     createDtoMock.moneda_destino='USD';
  //     createDtoMock.tipo_cambio=0;
  //     await expect(service.create(createDtoMock)).rejects.toThrow(new BadRequestException());
  //   })
  // })
});

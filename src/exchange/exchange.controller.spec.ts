import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeController } from './exchange.controller';
import { ExchangeService } from './exchange.service';
import { BadRequestException } from '@nestjs/common';
import { CalculateExchangeDto } from './dto/calculate-exchange.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Exchange } from './entities/exchange.entity';
import { RedisService } from '../memoryDB/redis.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

describe('ExchangeController', () => {
  let controller: ExchangeController;
  let service: ExchangeService;

  const ExchangeRepositoryMock = {
    save: jest.fn(),
    find: jest.fn(),
    findOneOrFail: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
  };

  const RedisServiceMock = {
    get:jest.fn(),
    set:jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExchangeController],
      providers: [ExchangeService,
        JwtService,
        ConfigService,
        {
          provide: getRepositoryToken(Exchange),
          useValue: ExchangeRepositoryMock,
        },
        {
          provide:RedisService,
          useValue: RedisServiceMock
        }
      ],
    }).compile();

    controller = module.get<ExchangeController>(ExchangeController);
    service = module.get<ExchangeService>(ExchangeService);

  });

  it('ExchangeController definido', () => {
    expect(controller).toBeDefined();
  });

  describe('Método calculate()', () => {

    it('Debe generar el calculo correctamente', async () => {

      const calculateExchangeDto: CalculateExchangeDto = {
        moneda_origen: 'PEN',
        moneda_destino: 'USD',
        monto: 10,
      };
  
      const response = {
        "monto": 10,
        "monto_tipo_cambio": 2.7,
        "moneda_origen": "PEN",
        "moneda_destino": "USD",
        "tipo_cambio": 0.27
      }; 

      jest.spyOn(service, 'calculateMount').mockResolvedValue(response);
      const result = await controller.calculate(calculateExchangeDto);
      expect(result).toEqual(response);
    });

  });
});

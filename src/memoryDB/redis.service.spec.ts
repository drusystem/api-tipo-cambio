import { Test, TestingModule } from '@nestjs/testing';
import { RedisService } from './redis.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('RedisService', () => {
  let service: RedisService;
  let cacheManagerMock = {
    get:jest.fn(),
    set:jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedisService,
        {
         provide:CACHE_MANAGER,
         useFactory: ()=>{cacheManagerMock} 
        }
      ],
    }).compile();

    service = module.get<RedisService>(RedisService);
  });

  it('RedisService definido', () => {
    expect(service).toBeDefined();
  });
});

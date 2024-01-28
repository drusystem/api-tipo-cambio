import { Module } from '@nestjs/common';
import { RedisModule } from './memoryDB/redis.module';
import { ExchangeModule } from './exchange/exchange.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST','localhost'),
        port: configService.get<number>('DB_PORT',3306),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      })
    }),
    CacheModule.registerAsync({
      isGlobal:true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>({
        store: await redisStore({
          socket:{
            host:configService.get<string>('REDIS_HOST','localhost'),
            port:configService.get<number>('REDIS_PORT',6379),
          }
        })
      })
    }),
    RedisModule,
    ExchangeModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

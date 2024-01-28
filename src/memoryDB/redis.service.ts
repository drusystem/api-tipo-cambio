import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {

    constructor(
        @Inject(CACHE_MANAGER) private readonly cacheManager:Cache,
    ){}

    async set(key:string,value:any={},ttl:number=parseInt(process.env.REDIS_TTL)):Promise<any>{
        return await this.cacheManager.set(key,value,ttl)
    }

    async get(key:string):Promise<any>{
        return await this.cacheManager.get(key)
    }
}

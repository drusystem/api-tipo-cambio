import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { responseRegisterType } from './types/responseRegister.type';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService:UsersService,
        private readonly jwtService:JwtService
        ){}

    async register(registerDto:RegisterDto):Promise<responseRegisterType>{

        const user = await this.usersService.findOneByEmail(registerDto.email);

        if(user){
            throw new BadRequestException('El usuario ya existe');
        }

        const newUser:User = await this.usersService.create({
            ...registerDto,
            password:await bcryptjs.hash(registerDto.password,10)
        });

        const result ={
            id:newUser.id,
            name:newUser.name,
            email:newUser.email,
        }

        return result;
    }

    async login(loginDto:LoginDto){
        const user = await this.usersService.findOneByEmail(loginDto.email);

        if(!user){
            throw new UnauthorizedException('El email o contraseña son incorrectos');
        }

        const isPasswordValid = await bcryptjs.compare(loginDto.password,user.password);

        if(!isPasswordValid){
            throw new UnauthorizedException('El email o contraseña son incorrectos');
        }

        const payload = {email:user.email,username:user.name};
        const token = await this.jwtService.signAsync(payload);

        return {
            token,
            user:user.email
        };
    }

}
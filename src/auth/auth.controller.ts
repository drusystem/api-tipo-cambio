import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { responseRegisterType } from './types/responseRegister.type';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService:AuthService){}

    @Post('login')
    login(
        @Body()
        loginDto:LoginDto
    ){
        return this.authService.login(loginDto)
    }

    @Post('register')
    async register(
        @Body()
        registerDto:RegisterDto
    ):Promise<responseRegisterType>{
        return await this.authService.register(registerDto)
    }
}

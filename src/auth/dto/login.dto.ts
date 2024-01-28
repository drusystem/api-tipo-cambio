import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginDto{

    @IsEmail({},{message:"El correo no tiene el formato correcto."})
    email:string;

    @Transform(({value})=>value.trim())
    @IsString()
    @MinLength(8,{message:"La contraseña debe tener mínimo 8 carácteres."})
    password:string;
}
import { Transform } from "class-transformer";
import { Equals, IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class RegisterDto{

    @Transform(({value})=>value.trim())
    @IsNotEmpty({message:"El nombre de usuario es obligatorio"})
    @IsString({message:"El nombre de usuario debe ser un string"})
    @MinLength(6,{message:"El nombre de usuario debe tener mínimo 6 carácteres."})
    name:string;

    @IsEmail({},{message:"El correo no tiene el formato correcto."})
    email:string;

    @Transform(({value})=>value.trim())
    @IsString()
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    @MaxLength(20, { message: 'La contraseña no puede tener más de 20 caracteres' })
    password:string;

}
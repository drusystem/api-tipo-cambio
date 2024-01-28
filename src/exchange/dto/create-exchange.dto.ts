import {IsNotEmpty, IsNumber, IsString, Length, Min } from "class-validator";

export class CreateExchangeDto {
    @IsString({message:'La moneda origen debe ser un string'})
    @IsNotEmpty({message:'La moneda origen es requerido'})
    @Length(3,3,{message:'La moneda origen solo puede tener 3 carácteres'})
    moneda_origen:string;

    @IsString({message:'La moneda destino debe ser un string'})
    @IsNotEmpty({message:'La moneda destino es requerido'})
    @Length(3,3,{message:'La moneda destino solo puede tener 3 carácteres'})
    moneda_destino:string;

    @IsNumber({},{message:'El tipo de cambio debe ser un número'})
    @Min(0.01, { message: 'El tipo de cambio debe ser mayor o igual a 0.01' })
    @IsNotEmpty({message:'El tipo de cambio es requerido'})
    tipo_cambio:number;
}

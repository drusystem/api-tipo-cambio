import {IsNotEmpty, IsNumber, IsString, Length, Min } from "class-validator";

export class CalculateExchangeDto {
    @IsString({message:'La moneda origen debe ser un string'})
    @IsNotEmpty({message:'La moneda origen es requerido'})
    @Length(3, 3,{message:'Solo se permite 3 carácteres'})
    moneda_origen:string;

    @IsString({message:'La moneda destino debe ser un string'})
    @IsNotEmpty({message:'La moneda destino es requerido'})
    @Length(3, 3,{message:'Solo se permite 3 carácteres'})
    moneda_destino:string;

    @IsNumber({},{message:'El monto debe ser un número'})
    @Min(0.01, { message: 'El monto debe ser mayor o igual a 0.01' })
    @IsNotEmpty({message:'El monto es requerido'})
    monto:number;
}

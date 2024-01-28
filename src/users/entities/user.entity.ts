import { Exclude } from "class-transformer";
import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable:false})
    name:string;

    @Column({unique:true,nullable:false})
    email:string;

    @Exclude()
    @Column({nullable:false})
    password:string;

    @Exclude()
    @DeleteDateColumn()
    deletedAt:Date;


}


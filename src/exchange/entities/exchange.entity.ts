import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn  } from "typeorm";
@Entity()
export class Exchange {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    moneda_origen:string;

    @Column()
    moneda_destino:string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    tipo_cambio:number;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}

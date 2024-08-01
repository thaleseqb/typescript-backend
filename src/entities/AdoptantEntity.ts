import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
  } from "typeorm";
import AddressEntity from "./Address";
  
@Entity()
export default class AdoptantEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    name: string;
    @Column()
    password: string;
    @Column()
    phone: string;
    @Column({nullable:true})
    photograph?: string;
    @OneToOne(() => AddressEntity, {nullable:true, cascade:true, eager:true})
    @JoinColumn()
    address?: AddressEntity;

    constructor(
        name: string,
        password: string,
        phone: string,
        photograph?: string,
        address?: AddressEntity
    ) {
        this.name = name;
        this.password = password;
        this.photograph = photograph;
        this.phone = phone;
        this.address = address;
    }
}
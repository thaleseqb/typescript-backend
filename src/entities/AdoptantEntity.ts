import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from "typeorm";
  
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
    @Column({nullable:true})
    address?: string;

    constructor(
        name: string,
        password: string,
        phone: string,
        photograph?: string,
        address?: string
    ) {
        this.name = name;
        this.password = password;
        this.photograph = photograph;
        this.phone = phone;
        this.address = address;
    }
}
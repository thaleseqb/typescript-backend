import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import EnumSpecie from "../enum/EnumSpecie";

@Entity()
export default class PetEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    name: string;
    @Column()
    specie: EnumSpecie;
    @Column()
    bornDate: Date;
    @Column()
    adopted:boolean;

    constructor( name:string, specie:EnumSpecie, bornDate:Date, adopted:boolean ) {
        this.name = name;
        this.specie= specie;
        this.bornDate = bornDate;
        this.adopted= adopted;
    }
}
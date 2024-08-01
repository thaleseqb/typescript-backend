import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import EnumSpecie from "../enum/EnumSpecie";
import AdoptantEntity from "./AdoptantEntity";

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
    @ManyToOne(() => AdoptantEntity, (adoptant) => adoptant.pets)
    adoptant!: AdoptantEntity;

    constructor( name:string, specie:EnumSpecie, bornDate:Date, adopted:boolean ) {
        this.name = name;
        this.specie= specie;
        this.bornDate = bornDate;
        this.adopted= adopted;
    }
}
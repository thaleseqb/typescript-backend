import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import EnumSpecie from "../enum/EnumSpecie";
import AdoptantEntity from "./AdoptantEntity";
import EnumSize from "../enum/EnumSize";

@Entity()
export default class PetEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    name: string;
    @Column()
    specie: EnumSpecie;
    @Column({nullable:true})
    size?:EnumSize
    @Column()
    bornDate: Date;
    @Column()
    adopted:boolean;
    @ManyToOne(() => AdoptantEntity, (adoptant) => adoptant.pets)
    adoptant!: AdoptantEntity;

    constructor( 
        name:string, 
        specie:EnumSpecie, 
        bornDate:Date, 
        adopted:boolean, 
        size?:EnumSize
    ) {
        this.name = name;
        this.specie= specie;
        this.bornDate = bornDate;
        this.adopted= adopted;
        this.size = size;
    }
}
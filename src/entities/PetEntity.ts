import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import EnumSpecie from "../enum/EnumSpecie";

@Entity()
export default class PetEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    specie: EnumSpecie;
    @Column()
    bornData: Date;
    @Column()
    adopted:boolean;
}
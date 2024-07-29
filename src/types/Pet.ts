import EnumSpecie from "../enum/EnumSpecie";

export default interface Pet {
    id:number;
    name:string;
    specie:EnumSpecie;
    bornDate:Date;
    adopted:boolean
}
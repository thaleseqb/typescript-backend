import PetEntity from "../../entities/PetEntity";
import Pet from "../../types/Pet";

export default interface InterfacePetRepos {
    createPet(pet: PetEntity) : void;
    getPetList(): Array<Pet> | Promise<Array<Pet>>;
    updatePet(
        id:number, 
        pet:PetEntity
    ): Promise<{success:boolean; message?: string}> | void;
    deletePet(id:number): Promise<{success:boolean; message?: string}> | void;
}
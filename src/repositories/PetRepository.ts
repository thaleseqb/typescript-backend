import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity";
import Pet from "../types/Pet";
import InterfacePetRepos from "./interfaces/InterfacePetRepos";

export default class PetRepository implements InterfacePetRepos {
    
    private repository: Repository<PetEntity>;

    constructor(repository: Repository<PetEntity>) {
        this.repository = repository;
    }

    createPet(pet: PetEntity): void {
        this.repository.save(pet);
    }

    async getPetList(): Promise<Array<Pet>> {
        return await this.repository.find();
    }
    updatePet(id: number, pet: PetEntity): void {
        throw new Error("Method not implemented.");
    }
    deletePet(id: number, pet: PetEntity): void {
        throw new Error("Method not implemented.");
    }

}
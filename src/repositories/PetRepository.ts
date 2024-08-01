import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity";
import Pet from "../types/Pet";
import InterfacePetRepos from "./interfaces/InterfacePetRepos";

export default class PetRepository implements InterfacePetRepos {
    
    private repository: Repository<PetEntity>;

    constructor(repository: Repository<PetEntity>) {
        this.repository = repository;
    }

    public createPet(pet: PetEntity): void {
        this.repository.save(pet);
    }

    public async getPetList(): Promise<Array<Pet>> {
        return await this.repository.find();
    }

    public async updatePet(
        id: number,
        newPet: PetEntity
    ): Promise<{ success: boolean; message?: string }> {
    
        try {
            const petToUpdate = await this.repository.findOne({ where: { id } });

            if (!petToUpdate) {
                return { success: false, message: "Pet não encontrado" };
            }

            Object.assign(petToUpdate, newPet);

            await this.repository.save(petToUpdate);

            return { success: true };

        } catch (error) {
            
            return {
                success: false,
                message: "Ocorreu um erro ao tentar atualizar o pet.",
            };
        }
    }

    async deletePet(id: number): Promise<{success:boolean; message?: string}> {
        
        try {
            const petToRemove = await this.repository.findOne({ where : {id} });

            if (!petToRemove) {
                return {success: false, message: "Pet não encontrado"}
            }

            await this.repository.remove(petToRemove);

            return {success: true};

        } catch (error) {
            
            return {
                success: false,
                message: "Ocorreu um erro ao tentar excluir o pet"
            };
        }
    }

}
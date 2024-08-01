import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity";
import Pet from "../types/Pet";
import InterfacePetRepos from "./interfaces/InterfacePetRepos";
import AdoptantEntity from "../entities/AdoptantEntity";
import EnumSize from "../enum/EnumSize";

export default class PetRepository implements InterfacePetRepos {
    
    private repository: Repository<PetEntity>;
    private adoptantRepository: Repository<AdoptantEntity>;

    constructor(
        repository: Repository<PetEntity>, 
        adoptantRepository: Repository<AdoptantEntity>
    ) {
        this.repository = repository;
        this.adoptantRepository = adoptantRepository;
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

    public async deletePet(id: number): Promise<{success:boolean; message?: string}> {
        
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

    public async petAdoption(
        idPet: number, 
        idAdoptant: number
    ): Promise<{ success: boolean; message?: string; }> {
        try {

            const pet = await this.repository.findOne({ where : {id: idPet} });
            if (!pet) {
                return {success: false,message: "pet não encontrado"}
            }

            const adoptant = await this.adoptantRepository.findOne({ where : {id: idAdoptant} });
            if (!adoptant) {
                return {success: false,message: "adotante não encontrado"}
            }

            pet.adoptant = adoptant;
            pet.adopted = true;
            await this.repository.save(pet);

            return {success:true};
        } catch (error) {
            return {
                success:false,
                message: `Ocorreu o seguinte erro no processo de adoção: ${error}`
            }
        }
    }

    public async searchBySize(size: EnumSize): Promise<Array<PetEntity>> {
        const pets = await this.repository.find({ where : { size } });
        return pets;
    }
}
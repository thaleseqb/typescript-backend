import { Request, Response } from "express";
import Pet from "../types/Pet";
import EnumSpecie from "../enum/EnumSpecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";
import EnumSize from "../enum/EnumSize";

let petList: Array<Pet> = [];

export default class PetController {

    private petId: number;

    constructor(private repository:PetRepository, petId:number) {
        this.petId = petId;
    }

    private async getListLength(): Promise<number> {
        const petList = await this.repository.getPetList();
        return petList.length;
    } 

    private async idDefiner(): Promise<void> {
        this.petId = await this.getListLength() + 1 ;
    }

    private deleteId(): void {
        if (this.petId === 0) {
            return;
        }
        this.petId -= 1;
    }

    private createNewPet(name:string, specie:EnumSpecie, bornDate:Date, adopted:boolean, size: EnumSize): PetEntity {
        const newPet = new PetEntity(name, specie, bornDate, adopted, size);
        this.idDefiner();
        newPet.id = this.petId;

        return newPet;
    }

    public async getPetList(req:Request, res:Response) {
        const petList = await this.repository.getPetList();
        return res.status(200).json(petList)
    }

    public async createPet(req:Request, res: Response) {
        const { 
            adopted, 
            specie, 
            bornDate, 
            name,
            size
        } = <PetEntity>req.body;
        
        if (!Object.values(EnumSpecie).includes(specie)) {
            return res.status(400).json({erro: "Espécie inválida"});
        }
        if (size && !(size in EnumSize)) {
            return res.status(400).json({erro: "Porte inválido"});
        }
        
        this.idDefiner();

        const newPet = this.createNewPet(name, specie, bornDate, adopted, <EnumSize>size);

        await this.repository.createPet(newPet);
        return res.status(201).json(newPet);
    }

    public async updatePet (req: Request, res: Response) {
        const { id } = req.params;
        const { success, message } = await this.repository.updatePet(
          Number(id),
          <PetEntity>req.body
        );
      
        if (!success) {
          return res.status(404).json({ message });
        }
        return res.sendStatus(204);
    }

    public async deletePet (req: Request, res: Response) {
        const { id } = req.params;

        const { success, message } = await this.repository.deletePet(Number(id));
      
        if (!success) {
          return res.status(404).json({ message });
        }
        this.deleteId();
        return res.sendStatus(204);
    }

    public async adoptPet(req: Request, res: Response) {
        const { pet_id, adoptant_id } = req.params;
        const {success, message } = await this.repository.petAdoption(
            Number(pet_id), 
            Number(adoptant_id)
        );

        if (!success) {
            return res.status(404).json(message);
        }

        return res.sendStatus(204);
    }

    public async searchByGenerics(req: Request, res: Response) {
        const { field, value } = req.query;

        const petList = await this.repository.searchByGenerics(
            field as keyof PetEntity, 
            value as keyof PetEntity
        );

        return res.status(200).json(petList);
    }
}
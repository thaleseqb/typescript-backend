import { Request, Response } from "express";
import Pet from "../types/Pet";
import EnumSpecie from "../enum/EnumSpecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";

let petList: Array<Pet> = [];

export default class PetController {
    
    private petId: number;

    constructor(private repository:PetRepository, petId: number) {
        this.petId = petId;
    }

    private async getListLength(): Promise<number> {
        const petList = await this.repository.getPetList();
        return petList.length;
    } 

    private async idDefiner(): Promise<void> {
        this.petId = await this.getListLength() + 1 ;
    }

    public async getPetList(req:Request, res:Response) {
        this.getListLength();
        const petList = await this.repository.getPetList();
        return res.status(200).json(petList)
    }

    public async createPet(req:Request, res: Response) {
        const { 
            adopted, 
            specie, 
            bornDate, 
            name} = <PetEntity>req.body;
        
        if (!Object.values(EnumSpecie).includes(specie)) {
            return res.status(400).json({erro: "Espécie inválida"});
        }

        this.idDefiner();

        const newPet = new PetEntity(name, specie, bornDate, adopted);

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
        return res.sendStatus(204);
    }
}
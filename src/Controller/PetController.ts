import { Request, Response } from "express";
import Pet from "../types/Pet";
import EnumSpecie from "../enum/EnumSpecie";

let petList: Array<Pet> = [];

export default class PetController {

    private static petId: number = 0;

    private static idIncrement(): void {
        this.petId += 1;
    }

    public getPetList(req:Request, res:Response) {
        return res.status(200).json(petList)
    }

    public createPet(req:Request, res: Response) {
        const { 
            adopted, 
            specie, 
            bornDate, 
            name} = <Pet>req.body;
        
        if (!Object.values(EnumSpecie).includes(specie)) {
            return res.status(400).json({erro: "Espécie inválida"});
        }

        PetController.idIncrement();

        const newPet = {id: PetController.petId, adopted, specie, bornDate, name}
        petList.push(newPet);
        return res.status(201).json(newPet);
    }

    public updatePet (req: Request, res: Response) {
        const { id } = req.params;
        const { adopted, specie, bornDate, name} = <Pet>req.body ;
        const pet = petList.find((pet) => Number(pet.id) === Number(id));
        if (!pet) { 
            return res.status (404).json({ erro: "Pet não encontrado" });
        }
        
        pet.name = name;
        pet.bornDate = bornDate;
        pet.specie = specie;
        pet.adopted = adopted;
        return res.status(200).json(pet);
    }

    public deletePet (req: Request, res: Response) {
        const { id } = req.params;
        const pet = petList.find((pet) => Number(pet.id) === Number(id)); 
        if (!pet) {
            return res.status (404).json({ erro: "Pet não encontrado" }); 
        }
        const index = petList.indexOf(pet);
        petList.splice (index, 1);
        return res.status(200).json({ mensagem: "Pet deletado com sucesso" });
    }
}
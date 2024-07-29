import { Request, Response } from "express";
import Pet from "../types/Pet";
import EnumSpecie from "../enum/EnumSpecie";

let petList: Array<Pet> = [];

export default class PetController {
    getPetList(req:Request, res:Response) {
        return res.status(200).json(petList)
    }

    criaPet(req:Request, res: Response) {
        const {id, 
            adopted, 
            specie, 
            age, 
            name} = <Pet>req.body;
        
        if (!Object.values(EnumSpecie).includes(specie)) {
            return res.status(400).json({erro: "Espécie inválida"});
        }

        const newPet = {id, adopted, specie, age, name}
        petList.push(newPet);
        return res.status(201).json(newPet);
    }

    updatePet (req: Request, res: Response) {
        const { id } = req.params;
        const { adopted, specie, age, name} = <Pet>req.body ;
        const pet = petList.find((pet) => Number(pet.id) === Number(id));
        if (!pet) { 
            return res.status (404).json({ erro: "Pet não encontrado" });
        }
        
        pet.name = name;
        pet.age = age;
        pet.specie = specie;
        pet.adopted = adopted;
        return res.status(200).json(pet);
    }

    deletePet (req: Request, res: Response) {
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
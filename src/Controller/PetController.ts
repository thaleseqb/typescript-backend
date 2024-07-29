import { Request, Response } from "express";
import Pet from "../types/Pet";

let petList: Array<Pet> = [];

export default class PetController {
    criaPet(req:Request, res: Response) {
        const {id, 
            adotado, 
            especie, 
            idade, 
            nome} = <Pet>req.body;
        const newPet = {id, adotado, especie, idade, nome}
        petList.push(newPet);
        return res.status(201).json(newPet);
    }
}
import { Request, Response } from "express";
import AdoptantEntity from "../entities/AdoptantEntity";
import AdoptantRepository from "../repositories/AdoptantRepository";

export default class AdotanteController {
    constructor(private repository: AdoptantRepository) {}

    public async getAdoptantList(req: Request, res: Response) {
        const adoptantList = await this.repository.getAdoptantList();
        return res.status(200).json(adoptantList);
    }

    public async createAdoptant(req: Request, res: Response) {
        const { name, phone, address, photograph, password } = <AdoptantEntity>req.body;

        const newAdoptant = new AdoptantEntity(
            name,
            password,
            phone,
            photograph,
            address
        );

        await this.repository.createAdoptant(newAdoptant);
        return res.status(201).json(newAdoptant);
    }

    public async updateAdoptant(req: Request, res: Response) {
        const { id } = req.params;


    }
    
}
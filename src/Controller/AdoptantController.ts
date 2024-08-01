import { Request, Response } from "express";
import AdoptantEntity from "../entities/AdoptantEntity";
import AdoptantRepository from "../repositories/AdoptantRepository";
import AddressEntity from "../entities/Address";

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

        const {success, message} = await this.repository.updateAdoptant(
            Number(id), 
            <AdoptantEntity>req.body
        );

        if (!success) {
            return res.status(404).json({ message })
        }
        
        return res.sendStatus(204);
    }

    public async deleteAdoptant(req:Request, res: Response) {
        const { id } = req.params;
        const { success, message } = await this.repository.deleteAdoptant(
            Number(id)
        );

        if (!success) {
            return res.status(404).json({ message });
        }

        return res.sendStatus(204);
    }

    public async updateAdoptantAddress(req:Request, res: Response) {
        const { id } = req.params;
        const { success, message } = await this.repository.updateAdoptantAddress(
            Number(id),
            <AddressEntity>req.body
        );

        if (!success) {
            return res.status(404).json({ message });
        }

        return res.sendStatus(204);
    }
    
    
}
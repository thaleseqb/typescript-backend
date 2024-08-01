import express from "express";
import PetController from "../Controller/PetController";
import PetRepository from "../repositories/PetRepository";
import { AppDataSource } from "../config/DataSource";

const router = express.Router();

const petRepos = new PetRepository(
    AppDataSource.getRepository("PetEntity"), 
    AppDataSource.getRepository("AdoptantEntity")
);

const petController = new PetController(petRepos, 0);

router.get("/", (req,res)=>petController.getPetList(req,res))
router.post("/", (req,res)=>petController.createPet(req,res));
router.put("/:id", (req,res)=>petController.updatePet(req,res));
router.delete("/:id", (req,res)=>petController.deletePet(req,res));
router.put("/:pet_id/:adoptant_id",(req,res)=> 
    petController.adoptPet(req,res)
);

export default router;
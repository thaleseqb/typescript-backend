import express from "express";
import PetController from "../Controller/PetController";
import PetRepository from "../repositories/PetRepository";
import { AppDataSource } from "../config/DataSource";

const router = express.Router();

const petRepos = new PetRepository(AppDataSource.getRepository("PetEntity"));

const petController = new PetController(petRepos);

router.get("/", (req,res)=>petController.getPetList(req,res))
router.post("/", (req,res)=>petController.createPet(req,res));
router.delete("/:id", (req,res)=>petController.deletePet(req,res));
router.patch("/:id",(req,res)=> petController.updatePet(req,res));

export default router;
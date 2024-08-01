import express from "express";
import { AppDataSource } from "../config/DataSource";
import AdotanteController from "../Controller/AdoptantController";
import AdoptantRepository from "../repositories/AdoptantRepository";
const router = express.Router();

const adoptantRepository = new AdoptantRepository(
    AppDataSource.getRepository("AdoptantEntity")
);

const adotanteController = new AdotanteController(adoptantRepository);

router.get("/", (req, res) => adotanteController.getAdoptantList(req, res));
router.post("/", (req, res) => adotanteController.createAdoptant(req, res));

router.patch("/:id", (req, res) => adotanteController.createAdoptant(req, res));

export default router;
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
router.delete("/:id", (req, res) => adotanteController.deleteAdoptant(req, res));
router.put("/:id", (req, res) => adotanteController.updateAdoptant(req, res));

export default router;
import express from "express";
import PetController from "../Controller/PetController";

const router = express.Router();

const petController = new PetController();

router.get("/", petController.getPetList)
router.post("/", petController.createPet);
router.delete("/:id", petController.deletePet);
router.patch("/:id", petController.updatePet);

export default router;
import express from "express";
import petRouter from "../routes/petRouter"
import peopleRouter from "../routes/adoptantRouter"

const router = (app: express.Router) => {
    app.use("/pets", petRouter);
    app.use("/adotantes", peopleRouter);
}

export default router;
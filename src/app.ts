import express from "express";
import router from "./routes";
import "reflect-metadata";
import { AppDataSource } from "./config/DataSource";

const app = express();
app.use(express.json());
router(app);

AppDataSource.initialize().then(
    () => {console.log("banco de dados conectado");}
).catch(error => { console.log(error) })

export default app;

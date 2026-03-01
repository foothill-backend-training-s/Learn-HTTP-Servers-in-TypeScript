import express, { Request, Response, Router } from "express";
import { config } from "../../config.js";

const resetRouter: Router = express.Router();

resetRouter.get('/', (req: Request, res: Response) => {
    config.fileserverHits=0;
    res.status(200).send(`Hits resets to 0`)

});

export default resetRouter;
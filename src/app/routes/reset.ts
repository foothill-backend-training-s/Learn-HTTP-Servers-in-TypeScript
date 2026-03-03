import express, { Request, Response, Router } from "express";
import { reset } from "drizzle-seed";
import { config } from "../../config.js";
import { deleteUsers } from "../../db/queries/users.js";
import { HTTPError } from "../../errors/class_error.js";
// import { db } from "../../db/index.js";
// import * as schema from "../../db/schema.js";

const resetRouter: Router = express.Router();

resetRouter.post('/', async (req: Request, res: Response) => {
    if (config.api.platfrom == "dev") {
        config.api.fileserverHits = 0;
        await deleteUsers()
        // await reset(db, schema);
        res.status(200).send(`Hits resets to 0`)
    }
    else {
        throw new HTTPError("Forbidden, only admin users can access this", 403)
    }
});

export default resetRouter;
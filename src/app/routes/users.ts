import express, { Request, Response, Router } from "express";
import { createUser } from "../../db/queries/users.js";
import { HTTPError } from "../../errors/class_error.js";
import { hashPassword } from "../../auth.js";

const usersRouter: Router = express.Router();

usersRouter.post('/', async (req: Request, res: Response) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const hashedPass = await hashPassword(password);
        const user = await createUser({ email: email, hashed_password: hashedPass });
        res.status(201).json(user);
    } catch(err) {
        throw new HTTPError(" something went wrong ", 500);
    }
});

export default usersRouter;
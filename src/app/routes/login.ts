import express, { Request, Response, Router } from "express";
import { getUserByEmail } from "../../db/queries/users.js";
import { HTTPError } from "../../errors/class_error.js";
import { checkPasswordHash } from "../../auth.js";

const loginRouter: Router = express.Router();

loginRouter.post('/', async (req: Request, res: Response) => {

    const email = req.body.email;
    const password = req.body.password;
    const [user] = await getUserByEmail(email);
    console.log([user])
    if (await checkPasswordHash(password, user.hashed_password) == true) {
        console.log("password match");
        return res.status(200).json({
            "id": user.id,
            "createdAt": user.createdAt,
            "updatedAt": user.updatedAt,
            "email": user.email
        });
    } else {
        console.log("password didnt match");
        throw new HTTPError("incorrect email or password", 401);
    }
});

export default loginRouter;
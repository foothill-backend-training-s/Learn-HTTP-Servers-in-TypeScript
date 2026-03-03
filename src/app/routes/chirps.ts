import express, { Request, Response, Router } from "express";
import { HTTPError } from "../../errors/class_error.js";
import { insertChirp, getChips, getAChip } from "../../db/queries/chirps.js";

const chirpsRouter: Router = express.Router();

chirpsRouter.post('/', async (req: Request, res: Response) => {
    const reqBody = req.body.body;
    const reqUserId = req.body.userId;
    if (!reqBody || typeof reqBody !== "string") {
        return res.status(400).json({ "error": "Something went wrong" })

    }
    if (reqBody.length <= 140) {
        const wordsToRep = ["kerfuffle", "sharbert", "fornax"];
        let words: string[] = reqBody.split(" ");
        for (let word in words) {
            if (wordsToRep.includes(words[word].toLowerCase())) {
                words[word] = "****";
            }
        }
        const cleanedText = words.join(" ")
        const result = await insertChirp(cleanedText, reqUserId);
        return res.status(201).json(result);
    }
    else {
        throw new HTTPError("Chirp is too long. Max length is 140", 400);
    }
});

chirpsRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = `${req.params.id}`;
        console.log(`chipId: ${id}`);
        const [result] = await getAChip(id);
        res.status(200).json(result)
    } catch (err) {

        throw new HTTPError("chip not found!", 404);
    }
});

chirpsRouter.get('/', async (req: Request, res: Response) => {
    try {

        const result = await getChips()
        res.status(200).json(result)
    } catch (err) {
        if (err instanceof Error) {
            throw new HTTPError(err.message, 500);
        }
    }
});


export default chirpsRouter;
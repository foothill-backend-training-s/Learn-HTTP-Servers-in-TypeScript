import express, { Router, Request, Response } from 'express';
const readinessRouter: Router = express.Router();

readinessRouter.get('/', (req: Request, res: Response) => {
    res.set(
        {
            "Content-Type": 'text/plain',
            "charset": "utf-8"
        }
    );
    res.status(200).send("OK")
});

export default readinessRouter;
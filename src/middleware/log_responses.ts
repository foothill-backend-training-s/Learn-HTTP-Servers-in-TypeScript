import { Request, Response,NextFunction  } from "express";
export function middlewareLogResponses(req: Request, res: Response, next: NextFunction): void {

    res.on("finish", () => {
        const resStatus = res.statusCode
        if (resStatus !== 200)
            console.log(`[NON-OK] ${req.method} ${req.url} - Status: ${resStatus}`)
    });
    next()
}
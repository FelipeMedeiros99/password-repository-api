import { Request, Response, NextFunction } from "express";

export async function createCredentialController(req: Request, res: Response, next: NextFunction){
    res.sendStatus(200)
}
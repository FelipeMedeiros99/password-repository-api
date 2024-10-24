import { Request, Response, NextFunction } from "express";
import { decryptToken, loginUserService, registerUserService } from "../services/userServices";
import { PathName, UserDataReceived } from "../types/userTypes";
import { findAllDataRepository } from "../repositories/storeRepository";
import { DecryptedToken } from "../types/storeTypes";

export async function registerController(req: Request, res: Response, next: NextFunction) {
    const userData: UserDataReceived = req.body;
    try {

        await registerUserService(userData)
        res.sendStatus(201);

    } catch (e) {
        next(e)
    }
}


export async function loginController(req: Request, res: Response, next: NextFunction) {
    const userData: UserDataReceived = req.body;
    try {
        const token = await loginUserService(userData)
        res.status(200).send(token)
    } catch (e) {
        next(e)
    }
}

export async function getAllDataController(req: Request, res: Response, next: NextFunction) {
    const url = req.url as PathName; 
    const token = req.headers.authorization as string;
    const decryptedToken = await decryptToken(token) as DecryptedToken

    const data = await findAllDataRepository(decryptedToken, url)
    

    res.status(200).send(data);
}
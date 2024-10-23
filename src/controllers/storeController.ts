import { Request, Response, NextFunction } from "express";
import { decryptToken } from "../services/userServices";
import { PathName } from "../types/userTypes";
import { saveStoreRepository } from "../repositories/storeRepository";
import { ReceivedDataStore } from "../types/storeTypes";

export async function createCredentialController(req: Request, res: Response, next: NextFunction) {
    const decryptedToken = await decryptToken(req.headers?.authorization as string);
    const receivedData = req.body as ReceivedDataStore
    const url = req.url as PathName;

    try {
        await saveStoreRepository(decryptedToken, url, receivedData)
        res.send(receivedData).status(201);
    }catch(e){
        next(e)
    }
    

}
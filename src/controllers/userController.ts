import { Request, Response, NextFunction } from "express";
import { decryptToken, loginUserService, registerUserService } from "../services/userServices";
import { PathName, UserDataReceived } from "../types/userTypes";
import { deleteDataRepository, findAllDataRepository } from "../repositories/storeRepository";
import { DecryptedToken } from "../types/storeTypes";
import { decryptArrayData, decryptPasswordStoreService } from "../services/storeServices";
import { MessageError } from "../types/errorTypes";
import { validIfIdStoreIsValid, validIfDataExists } from "../services/validationsService";

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
    let dataId: string = req.params.id;
    const url = req.url as PathName;
    const token = req.headers.authorization as string;
    const decryptedToken = await decryptToken(token) as DecryptedToken
    
    try {
        validIfIdStoreIsValid(dataId)
        let data = await findAllDataRepository(decryptedToken, url, dataId)
        validIfDataExists(data)
        const dataDecrypted = decryptArrayData(data)
        res.status(200).send(dataDecrypted);
    } catch (e) {
        next(e)
    }
}


export async function deleteDataController(req: Request, res: Response, next: NextFunction) {
    let dataId: string = req.params.id;
    const url = req.url as PathName;
    const token = req.headers.authorization as string;
    const decryptedToken = await decryptToken(token) as DecryptedToken
    
    try {
        validIfIdStoreIsValid(dataId)
        let data = await findAllDataRepository(decryptedToken, url, dataId)
        validIfDataExists(data)
        await deleteDataRepository(decryptedToken, url, dataId)
        res.sendStatus(200);
    } catch (e) {
        next(e)
    }
}

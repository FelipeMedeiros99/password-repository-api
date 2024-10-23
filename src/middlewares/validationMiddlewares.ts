import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { validBearerIsInTheTokenService, validTokenExistInDatabase } from "../services/validationsService";
import { PathName } from "../types/userTypes";
import { decryptToken } from "../services/userServices";
import { DecryptedToken } from "../types/storeTypes";
import { validIfTitleExistsService } from "../services/storeServices";


export function schemaValidation(schema: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { body: registerData } = req;
        const { error } = schema.validate(registerData, { abortEarly: false })

        if (error) {
            throw { message: error.message, status: 404 }
        }
        next()
    }
}

export async function validTokenMiddleware(req: Request, res: Response, next: NextFunction) {
    const { authorization: token } = req.headers;

    try {
        validBearerIsInTheTokenService(token)
        await validTokenExistInDatabase(token as string)
        next()

    } catch (e) {
        next(e)
    }

}

export async function validTitleIsUniqueMiddleware(req: Request, res: Response, next: NextFunction) {
    const dataReceived = req.body;
    const { title } = dataReceived;
    const pathName = req.url as PathName;
    const authorization = req.headers?.authorization as string;
    const decryptedToken = await decryptToken(authorization)
    
    try{
        await validIfTitleExistsService(pathName, decryptedToken, title)
        next()
    }catch(e){
        next(e)
    }

}
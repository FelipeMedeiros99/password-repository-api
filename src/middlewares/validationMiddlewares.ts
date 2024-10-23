import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { validBearerIsInTheTokenService, validTokenExistInDatabase } from "../services/validationsService";


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

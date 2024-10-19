import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";


export function schemaValidation(schema: ObjectSchema) {
    return (req:Request, res: Response, next:NextFunction)=>{
        const {body: registerData } = req;
        const { error, value } = schema.validate(registerData)
        if(error){
            throw {message: "invalid format", status: 404}
        }
    }
}
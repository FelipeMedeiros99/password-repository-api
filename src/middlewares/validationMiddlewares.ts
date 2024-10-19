import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";


export function schemaValidation(schema: ObjectSchema) {
    return (req:Request, res: Response, next:NextFunction)=>{
        const {body: registerData } = req;
        const { error } = schema.validate(registerData, {abortEarly:false})

        if(error){
            console.log(error)
            throw {message: error.message, status: 404}
        }
        next()
    }
}
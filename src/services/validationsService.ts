import bcrypt from "bcrypt";

import { User } from "@prisma/client";
import { UserDataReceived } from "../types/userTypes";
import { MessageError } from "../types/errorTypes";
import { findTokenInDatabase } from "../repositories/storeRepository";


export function conflitErrorService(validation: User | null) {
    if (validation) {
        const messageError: MessageError = { message: "user already exists", status: 409 };
        throw messageError;
    };
}

export async function validationDatasService(userDatabase: User | null, userData: UserDataReceived) {
    if (!userDatabase) {
        const messageError: MessageError = { message: "Email not found", status: 404 };
        throw messageError;
    }

    const passwordIsCorrect = await bcrypt.compare(userData.password, userDatabase.password)
    if (!passwordIsCorrect) {
        const messageError: MessageError = { message: "Email and password don't match", status: 401 }
        throw messageError
    }
}

export function validBearerIsInTheTokenService(token: string | undefined) {
    if (!token) {
        const messageError: MessageError = { message: "Invalid token", status: 404 }
        throw messageError;
    }
    if (!token.includes("Bearer ")) {
        const messageError: MessageError = { message: 'Token must be "Bearer token"', status: 404 }
        throw messageError;
    }
}

export async function validTokenExistInDatabase(token: string) {
    const tokenInDatabase = await findTokenInDatabase(token);
    if (!tokenInDatabase) {
        const messageError: MessageError = { message: "The token has expired", status: 404 }
        throw messageError;
    }

}

export function validIfIdStoreIsValid(dataId: string | undefined){
    if(Number.isNaN(Number(dataId)) && dataId !== undefined){
        const message: MessageError={message: "id need be a number", status: 400}
        throw message
    }
}

export function validIfDataExists(data:any) {
    if(!data){
        const message: MessageError={message: "data not found", status: 404}
        throw message
    }
}
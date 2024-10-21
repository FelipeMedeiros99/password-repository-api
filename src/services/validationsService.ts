import bcrypt from "bcrypt";

import { User } from "@prisma/client";
import { UserDataReceived } from "../types/userTypes";
import { MessageError } from "../types/errorTypes";


export function conflitErrorService(validation: User | null) {
    if (validation) {
        const messageError: MessageError = { message: "user already exists", status: 409 };
        throw messageError;
    };
}


export async function ValidationDatasService(userDatabase: User | null, userData: UserDataReceived) {
    if (!userDatabase) {
        const messageError: MessageError = { message: "Email not found", status: 404 };
        throw messageError;
    }

    const passwordIsCorrect = await bcrypt.compare(userData.password, userDatabase.password)
    if(!passwordIsCorrect){
        const messageError: MessageError = { message: "Email and password don't match", status: 401 }
        throw messageError
    }


}
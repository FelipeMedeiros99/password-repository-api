import { User } from "@prisma/client";
import { UserDataReceived } from "../types/userTypes";
import { MessageError } from "../types/errorTypes";

export function conflitErrorService(validation: User | null) {
    if (validation) {
        const messageError: MessageError = { message: "user already exists", status: 409 };
        throw messageError;
    };
}


export function ValidationDatasService(userDatabase: User | null, userData: UserDataReceived) {
    if (!userDatabase) {
        const messageError: MessageError = { message: "Email not found", status: 404 };
        throw messageError;
    }

}
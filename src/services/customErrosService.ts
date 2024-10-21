import { User } from "@prisma/client";
import { MessageError } from "../types/errorTypes";

export function conflitErrorService(validation: User|null) {
    if (validation) {
        // const messageError: MessageError = { message: "user already exists", status: 409 };
        throw { message: "user already exists", status: 409 };
    };

}
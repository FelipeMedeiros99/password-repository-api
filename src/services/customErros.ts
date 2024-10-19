import { MessageError } from "../types/errorTypes";

export function conflitError(validation: boolean){
    if(validation){
        const erro: MessageError = {message: "user already exists", status: 409};
        throw erro;
    };

}
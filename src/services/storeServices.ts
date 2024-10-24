import { findIfTitleExistsRepository, saveStoreRepository } from "../repositories/storeRepository";
import { MessageError } from "../types/errorTypes";
import { CredentialReceived, DecryptedToken, EntityName } from "../types/storeTypes";
import { PathName } from "../types/userTypes";


export async function validIfTitleExistsService(pathName: PathName, decryptedToken: DecryptedToken, title: string) {
    const titleExists = await findIfTitleExistsRepository(decryptedToken, pathName, title);

    if (titleExists) {
        const messageError: MessageError = { message: "this title already exists", status: 409 }
        throw messageError;
    }
}

import { title } from "process";
import prisma from "../config";
import { DecryptedToken, EntityName } from "../types/storeTypes";
import { PathName } from "../types/userTypes";

export async function findTokenInDatabase(token: string) {
    const tokenWithoutBearer = token.replace("Bearer", "").trim()
    const tokenData = await prisma.token.findFirst({ where: { token: tokenWithoutBearer } });
    return tokenData;
}


export async function findIfTitleExistsRepository(decryptedToken: DecryptedToken, pathName: PathName, title: string){
    const {id} = decryptedToken;

    const entityName = pathName.replace("/", "") as any;

    const titleExists = await (prisma[entityName] as any).findFirst({
        where: {
            userId: id,
            title
        }
    }) 

    return titleExists;

}
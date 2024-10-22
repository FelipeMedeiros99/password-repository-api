import prisma from "../config";

export async function findTokenInDatabase(token: string) {
    const tokenData = await prisma.token.findFirst({ where: { token } });
    return tokenData;
}
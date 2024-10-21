import prisma from "../config";
import { SaveToken, UserDataReceived } from "../types/userTypes";

export async function findUserReposytory(userData: UserDataReceived) {
    const user = await prisma.user.findFirst({ where: { email: userData.email } });
    return user;
}

export async function createUserRepository(userData: UserDataReceived) {
    await prisma.user.create({ data: userData });
}

export async function saveTokenRepository(userDataToken: SaveToken) {
    await prisma.token.create({ data: userDataToken })
}

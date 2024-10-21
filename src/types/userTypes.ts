import { Token, User } from "@prisma/client";

export type UserDataReceived = Omit<User, "id"> & {
    passwordConfirmation?: string;
}

export type SaveToken = Omit<Token, "id" | "createdAt">
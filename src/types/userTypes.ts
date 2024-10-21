import { User } from "@prisma/client";

export type UserDataReceived = Omit<User, "id"> & {
    passwordConfirmation?: string;
}

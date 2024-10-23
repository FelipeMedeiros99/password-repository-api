import { Credentials, SecurityNotes } from "@prisma/client";

export type CredentialReceived = Omit<Credentials, "id" | "userId">

export type SecurityNotesReceived = Omit<SecurityNotes, "id" | "userId">

export type ReceivedDataStore = CredentialReceived | SecurityNotesReceived

export type DecryptedToken = {
    id: number;
    email: string;
    iat?: number
}

export type EntityName = "cards" | "credentials" | "securityNotes" | "wifi"
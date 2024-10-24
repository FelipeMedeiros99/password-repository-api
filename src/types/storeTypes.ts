import { Cards, Credentials, SecurityNotes, Wifi } from "@prisma/client";

export type CredentialReceived = Omit<Credentials, "id" | "userId">

export type SecurityNotesReceived = Omit<SecurityNotes, "id" | "userId">

export type WifiReceived = Omit<Wifi, "id" | "userId">

export type CardsReceived = Omit<Cards, "id" | "userId">

export type ReceivedDataStore = CredentialReceived | SecurityNotesReceived | WifiReceived | CardsReceived

export type DecryptedToken = {
    id: number;
    email: string;
    iat?: number
}

export type EntityName = "cards" | "credentials" | "securityNotes" | "wifi"
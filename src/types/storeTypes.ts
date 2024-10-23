import { Credentials } from "@prisma/client";

type CredentialReceived = Omit <Credentials, "id" | "userId">

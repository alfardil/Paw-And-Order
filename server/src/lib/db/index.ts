import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

/**
 * Please try to write a db function call and use that instead.
 * @deprecated
 */
const db = globalThis.prismaGlobal ?? prismaClientSingleton();

export { db };
export * from "@/lib/db/functions/auth/user";
export * from "@/lib/db/functions/party";

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = db;

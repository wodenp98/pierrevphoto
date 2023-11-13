// @ts-nocheck
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// import { PrismaClient } from '@prisma/client'

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

// const globalForPrisma = global as unknown as { prisma: PrismaClient };

// export const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     log: ["query"],
//   });

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;


// import { PrismaClient } from '@prisma/client';

// const globalForPrisma = global as unknown as {
//   prisma: PrismaClient | undefined;
// };

// const isBrowser = typeof window !== 'undefined';

// export const prisma = (
//   isBrowser
//     ? undefined
//     : globalForPrisma.prisma ??
//       new PrismaClient({
//         log: ['query'],
//       })
// ) as PrismaClient;

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

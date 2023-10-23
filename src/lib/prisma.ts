import { PrismaClient } from '@prisma/client';

interface CustomGlobal {
  prisma?: PrismaClient;
}

declare const global: CustomGlobal;

const prisma: PrismaClient = global.prisma ?? new PrismaClient();

if (process.env.NODE_ENV === 'development') global.prisma = prisma;

export default prisma;
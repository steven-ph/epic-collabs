import { PrismaClient } from '@prisma/client';

export interface Context {
  prisma: PrismaClient;
}

let prisma = null;
const makePrismaClient = () => {
  if (prisma) {
    return prisma;
  }

  prisma = new PrismaClient();

  return prisma;
};

const makeContext = ({ event }): Context => {
  const prismaClient = makePrismaClient();

  return {
    prisma: prismaClient
  };
};

export { makeContext };

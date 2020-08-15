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

const makeContext = ({ event }) => {
  if (!event) {
    return Promise.reject(new Error('No lambda event detected'));
  }

  const prismaClient = makePrismaClient();

  return {
    prisma: prismaClient,
    viewer: {
      id: 'my-user-id'
    }
  };
};

export { makeContext };

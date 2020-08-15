import { Context } from '../make-context';

export const resolvers = {
  Query: {
    allCategories: (_, __, ctx: Context) => ctx.prisma.category.findMany()
  },
  Mutation: {
    addCategory: (_, { input }, ctx: Context) => {
      return ctx.prisma.category.create({
        data: input
      });
    }
  }
};

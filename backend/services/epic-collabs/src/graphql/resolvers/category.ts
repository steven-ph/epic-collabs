import { Context } from '../make-context';

export const resolvers = {
  Query: {
    allCategories: (_, __, ctx: Context) => true
  },
  Mutation: {
    addCategory: (_, { input }) => input
  }
};

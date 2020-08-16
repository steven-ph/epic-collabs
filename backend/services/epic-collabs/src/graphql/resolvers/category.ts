export const resolvers = {
  Query: {
    allCategories: (_, __, ctx) => !!ctx
  },
  Mutation: {
    addCategory: (_, { input }) => input
  }
};

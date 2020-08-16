export const resolvers = {
  Query: {
    allCategories: _ => true
  },
  Mutation: {
    addCategory: (_, { input }) => input
  }
};

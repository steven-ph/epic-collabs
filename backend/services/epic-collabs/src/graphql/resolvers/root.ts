export const resolvers = {
  Query: {
    healthCheck: () => true
  },
  Mutation: {
    echoTest: (_, { input: { echo } }) => ({ echo })
  }
};

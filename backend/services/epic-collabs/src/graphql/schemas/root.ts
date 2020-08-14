import { gql } from 'apollo-server-lambda';

const typeDefs = gql`
  type Query {
    healthCheck: Boolean!
  }

  type Mutation {
    echoTest(input: EchoTestInput!): EchoTestResponse
  }

  input EchoTestInput {
    echo: String
  }
  type EchoTestResponse {
    echo: String
  }
`;

const resolvers = {
  Query: {
    healthCheck: () => true
  },
  Mutation: {
    echoTest: (_, { input: { echo } }) => ({ echo })
  }
};

export { typeDefs, resolvers };

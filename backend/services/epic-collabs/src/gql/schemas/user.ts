import { gql } from 'apollo-server-lambda';

const typeDefs = gql`
  type User {
    _id: ID
    email: String
    picture: String
    username: String
    name: String
    firstName: String
    lastName: String
    bio: String
    createdAt: Float
    emailVerified: Boolean
  }

  type Query {
    me: User @auth(roles: [VIEWER], throwError: true)
  }
`;

export { typeDefs };

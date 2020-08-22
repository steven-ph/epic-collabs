import { gql } from 'apollo-server-lambda';

const typeDefs = gql`
  type User {
    id: ID
    email: String
    picture: String
    username: String
    firstName: String
    lastName: String
  }

  type Query {
    me: User
  }
`;

export { typeDefs };

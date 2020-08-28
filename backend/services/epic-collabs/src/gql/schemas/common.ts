import { gql } from 'apollo-server-lambda';

const typeDefs = gql`
  enum Status {
    OPEN
    CLOSED
    ON_HOLD
    FINISHED
  }

  enum Visibility {
    VISIBLE
    HIDDEN
  }
`;

export { typeDefs };

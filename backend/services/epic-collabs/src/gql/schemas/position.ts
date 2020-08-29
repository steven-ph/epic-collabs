import { gql } from 'apollo-server-lambda';

const typeDefs = gql`
  type Position {
    _id: ID
    name: String
    description: String
    createdAt: Float
    updatedAt: Float
    createdBy: User
    visibility: Visibility
    projects: [Project]
  }

  input PositionInput {
    name: String
  }

  type Query {
    positionById(id: String!): Position
    positionsByIds(ids: [String!]!): [Position]
    allPositions: [Position]
  }

  type Mutation {
    newPosition(input: PositionInput!): Position @auth(roles: [VIEWER], throwError: true)
  }
`;

export { typeDefs };

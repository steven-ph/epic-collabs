import { gql } from 'apollo-server-lambda';

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
    description: String
    picture: String
    createdAt: Float
    updatedAt: Float
    createdBy: User
    visibility: Visibility
    projects: [Project]
  }

  input CategoryInput {
    name: String
    description: String
    picture: String
  }

  type Query {
    categoryById(id: String!): Category
    categoriesByIds(ids: [String!]!): [Category]
    categories: [Category]
  }

  type Mutation {
    newCategory(input: CategoryInput!): Category @auth(roles: [VIEWER], throwError: true)
  }
`;

export { typeDefs };

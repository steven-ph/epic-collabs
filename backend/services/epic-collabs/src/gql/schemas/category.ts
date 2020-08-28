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
  }

  input AddCategoryInput {
    name: String
    description: String
    picture: String
  }

  type Query {
    categoryById(id: String!): Category
    categoriesByIds(ids: [String!]!): [Category]
    allCategories: [Category]
  }

  type Mutation {
    addCategory(input: AddCategoryInput!): Category @auth(roles: [VIEWER], throwError: true)
  }
`;

export { typeDefs };

import { gql } from 'apollo-server-lambda';

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
    description: String
    picture: String
    createdAt: Float
    updatedAt: Float
    createdBy: String
  }

  input AddCategoryInput {
    name: String
  }

  type Query {
    allCategories: [Category]
  }

  type Mutation {
    addCategory(input: AddCategoryInput!): Category @auth(roles: [VIEWER], throwError: true)
  }
`;

export { typeDefs };

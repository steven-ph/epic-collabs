import { gql } from 'apollo-server-lambda';

const typeDefs = gql`
  type Category {
    id: ID
    name: String
    description: String
    picture: String
    createdAt: Float
    updatedAt: Float
    createdBy: String
  }

  type Query {
    allCategories: [Category]
  }

  type Mutation {
    addCategory(input: AddCategoryInput!): Category
  }

  input AddCategoryInput {
    name: String
  }
`;

export { typeDefs };

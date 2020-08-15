import { gql } from 'apollo-server-lambda';

const typeDefs = gql`
  type Query {
    allCategories: Boolean
  }

  type Mutation {
    addCategory(input: AddCategoryInput!): AddCategoryResponse
  }

  input AddCategoryInput {
    name: String
  }

  type AddCategoryResponse {
    id: String
    name: String
  }
`;

export { typeDefs };

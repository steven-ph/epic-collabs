import { gql } from '@apollo/client';

const GET_ALL_CATEGORIES_QUERY = gql`
  query allCategories {
    allCategories {
      _id
      name
      description
      picture
      createdAt
      updatedAt
      createdBy
    }
  }
`;

export { GET_ALL_CATEGORIES_QUERY };

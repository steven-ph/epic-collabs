import { gql } from '@apollo/client';

const GET_ALL_CATEGORIES_QUERY = gql`
  query allCategories {
    allCategories
  }
`;

export { GET_ALL_CATEGORIES_QUERY };

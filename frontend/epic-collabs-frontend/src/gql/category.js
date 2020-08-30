import { gql } from '@apollo/client';

const GET_CATEGORIES_QUERY = gql`
  query categories {
    categories {
      _id
      name
      description
    }
  }
`;

export { GET_CATEGORIES_QUERY };

import { gql } from '@apollo/client';

const GET_PROJECTS_QUERY = gql`
  query projects {
    projects {
      _id
      slug
      name
      description
      image
      coverImage

      followers {
        _id
      }

      collaborators {
        user {
          _id
        }
        position {
          _id
        }
      }
    }
  }
`;

export { GET_PROJECTS_QUERY };

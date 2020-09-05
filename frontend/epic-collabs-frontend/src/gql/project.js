import { gql } from '@apollo/client';

const PROJECTS_QUERY = gql`
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

const PROJECT_BY_SLUG_QUERY = gql`
  query projectBySlug($slug: String!) {
    projectBySlug(slug: $slug) {
      _id
      slug
      name
      description
      image
      coverImage
      status
      visibility

      categories {
        _id
        name
      }

      followers {
        _id
      }

      collaborators {
        user {
          _id
          name
        }
        position {
          _id
          name
        }
      }

      createdBy {
        _id
        name
      }
    }
  }
`;

export { PROJECTS_QUERY, PROJECT_BY_SLUG_QUERY };

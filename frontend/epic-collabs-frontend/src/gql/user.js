import { gql } from '@apollo/client';

const USER_PROFILE_BY_ID_QUERY = gql`
  query userById($id: String!) {
    userById(id: $id) {
      _id
      email
      picture
      username
      name
      firstName
      lastName
      bio
      createdAt
      emailVerified
      socialNetworks {
        _id
        name
        url
      }
    }
  }
`;

const USER_PROFILE_BY_EMAIL_QUERY = gql`
  query userByEmail($email: String!) {
    userByEmail(email: $email) {
      _id
      email
      picture
      username
      name
      firstName
      lastName
      bio
      createdAt
      emailVerified
      socialNetworks {
        _id
        name
        url
      }
    }
  }
`;

const UPDATE_USER_PROFILE_MUTATION = gql`
  mutation updateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      _id
      success
    }
  }
`;

export { USER_PROFILE_BY_ID_QUERY, USER_PROFILE_BY_EMAIL_QUERY, UPDATE_USER_PROFILE_MUTATION };

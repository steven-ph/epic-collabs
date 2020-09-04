import { get } from 'lodash';
import { useQuery } from '@apollo/client';
import { USER_PROFILE_BY_ID_QUERY, USER_PROFILE_BY_EMAIL_QUERY } from 'gql/user';

const useGetUserProfileById = ({ id }) => {
  const { loading, data, error } = useQuery(USER_PROFILE_BY_ID_QUERY, {
    variables: { id }
  });

  return {
    loading,
    error,
    profile: get(data, 'userById')
  };
};

const useGetUserProfileByEmail = ({ email }) => {
  const { loading, data, error } = useQuery(USER_PROFILE_BY_EMAIL_QUERY, {
    variables: { email }
  });

  return {
    loading,
    error,
    profile: get(data, 'userByEmail')
  };
};

export { useGetUserProfileById, useGetUserProfileByEmail };

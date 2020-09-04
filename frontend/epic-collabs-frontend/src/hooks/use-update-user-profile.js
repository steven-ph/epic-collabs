import { get } from 'lodash';
import { useMutation } from '@apollo/client';
import { USER_PROFILE_BY_ID_QUERY, UPDATE_USER_PROFILE_MUTATION } from 'gql/user';

const useUpdateProfileMutation = ({ variables }) => {
  const [updateProfile, { loading, error, called }] = useMutation(UPDATE_USER_PROFILE_MUTATION, {
    variables,
    refetchQueries: [
      {
        query: USER_PROFILE_BY_ID_QUERY,
        variables: { id: get(variables, 'input._id') }
      }
    ]
  });

  return {
    updateProfile,
    updateError: error,
    updateCalled: called,
    loading
  };
};

export { useUpdateProfileMutation };

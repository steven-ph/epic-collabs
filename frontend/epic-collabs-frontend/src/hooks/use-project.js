import { get } from 'lodash';
import { useQuery } from '@apollo/client';
import { GET_PROJECTS_QUERY } from 'gql/project';

const useGetProjects = () => {
  const { loading, data, error } = useQuery(GET_PROJECTS_QUERY);

  return {
    loading,
    error,
    projects: get(data, 'projects')
  };
};

export { useGetProjects };

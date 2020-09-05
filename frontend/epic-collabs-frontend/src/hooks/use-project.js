import { get, values } from 'lodash';
import { useQuery } from '@apollo/client';
import { PROJECTS_QUERY, PROJECT_BY_SLUG_QUERY } from 'gql/project';

const useGetProjects = () => {
  const { loading, data, error } = useQuery(PROJECTS_QUERY);

  return {
    loading,
    error,
    projects: values(get(data, 'projects'))
  };
};

const useGetProjectBySlug = ({ slug }) => {
  const { loading, data, error } = useQuery(PROJECT_BY_SLUG_QUERY, {
    variables: { slug }
  });

  return {
    loading,
    error,
    project: get(data, 'projectBySlug')
  };
};

export { useGetProjects, useGetProjectBySlug };

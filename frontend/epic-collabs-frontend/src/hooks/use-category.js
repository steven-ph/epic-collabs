import { get } from 'lodash';
import { useQuery } from '@apollo/client';
import { GET_ALL_CATEGORIES_QUERY } from 'gql/category';

const useGetAllCategories = () => {
  const { loading, data, error } = useQuery(GET_ALL_CATEGORIES_QUERY);

  return {
    loading,
    error,
    allCategories: get(data, 'allCategories')
  };
};

export { useGetAllCategories };

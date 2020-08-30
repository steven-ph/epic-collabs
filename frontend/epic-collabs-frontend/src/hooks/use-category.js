import { get } from 'lodash';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES_QUERY } from 'gql/category';

const useGetCategories = () => {
  const { loading, data, error } = useQuery(GET_CATEGORIES_QUERY);

  return {
    loading,
    error,
    categories: get(data, 'categories')
  };
};

export { useGetCategories };

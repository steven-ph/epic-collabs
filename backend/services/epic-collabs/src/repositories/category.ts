import Dataloader from 'dataloader';
import { get, isEmpty } from 'lodash';
import { ICategory } from '../models/category';
import { loader } from '../utils/dataloader';

interface IAddCategoryInput {
  name: string;
}

interface ICategoryRepository {
  getCategoryById: (id: string) => Promise<ICategory | null>;
  getCategoriesByIds: (ids: string[]) => Promise<ICategory[] | null>;
  getAllCategories: () => Promise<ICategory[] | null>;
  addCategory: (input: IAddCategoryInput) => Promise<ICategory | null>;
}

const makeCategoryRepository = ({ categoryDb }): ICategoryRepository => {
  const categoryByIdLoader = new Dataloader((ids: string[]) => loader({ db: categoryDb, key: '_id', ids }), {
    cacheKeyFn: key => JSON.stringify(key)
  });

  const getCategoryById = async id => categoryByIdLoader.load(id);

  const getCategoriesByIds = async ids => categoryByIdLoader.loadMany(ids);

  const getAllCategories = async () => categoryDb.find();

  const addCategory = (input: IAddCategoryInput) => {
    const name = get(input, 'name');

    if (isEmpty(name)) {
      return null;
    }

    return categoryDb.create(input);
  };

  return {
    getCategoryById,
    getCategoriesByIds,
    getAllCategories,
    addCategory
  };
};

export { makeCategoryRepository, ICategoryRepository, ICategory, IAddCategoryInput };

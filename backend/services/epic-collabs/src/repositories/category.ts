import Dataloader from 'dataloader';
import { get, isEmpty } from 'lodash';
import { ICategoryModel } from '../models/category';
import { loader } from '../utils/dataloader';

interface IAddCategoryInput {
  name: string;
  createdBy: string;
}

interface ICategoryRepository {
  getCategoryById: (id: string) => Promise<ICategoryModel | null>;
  getCategoriesByIds: (ids: string[]) => Promise<ICategoryModel[] | null>;
  getAllCategories: () => Promise<ICategoryModel[] | null>;
  addCategory: (input: IAddCategoryInput) => Promise<ICategoryModel | null>;
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
    const createdBy = get(input, 'createdBy');

    if (isEmpty(name) || isEmpty(createdBy)) {
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

export { makeCategoryRepository, ICategoryRepository, ICategoryModel, IAddCategoryInput };

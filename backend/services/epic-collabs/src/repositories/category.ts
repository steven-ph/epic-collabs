import Dataloader from 'dataloader';
import { memoize } from 'lodash';
import { logger } from '@sp-tools/kloud-logger';
import { makeLoader } from '../utils/dataloader';
import { ICategoryModel, newCategoryValidationSchema } from '../models/category';

interface ICategoryRepository {
  getCategoryById: (id: string) => Promise<ICategoryModel>;
  getCategoriesByIds: (ids: string[]) => Promise<ICategoryModel[]>;
  getCategories: () => Promise<ICategoryModel[]>;
  createCategory: (input: ICategoryModel) => Promise<ICategoryModel>;
}

const makeCategoryRepository = ({ categoryDb }): ICategoryRepository => {
  const categoryByIdLoader = new Dataloader((ids: string[]) => makeLoader({ db: categoryDb, key: '_id', ids }), {
    cacheKeyFn: key => JSON.stringify(key)
  });

  const getCategoryById = async id => {
    if (!id) {
      return null;
    }

    return categoryByIdLoader.load(`${id}`);
  };

  const getCategoriesByIds = async ids => {
    if (!ids) {
      return null;
    }

    return categoryByIdLoader.loadMany(ids.map(id => `${id}`));
  };

  const getCategories = memoize(async () => categoryDb.find().lean());

  const createCategory = (input: ICategoryModel) => {
    const validated = newCategoryValidationSchema.validate(input);

    if (validated.error) {
      logger.error('createCategory error', { error: validated.error.message }, { input });

      throw new Error('createCategory error:' + validated.error.message);
    }

    return categoryDb.create(input);
  };

  return {
    getCategoryById,
    getCategoriesByIds,
    getCategories,
    createCategory
  };
};

export { makeCategoryRepository, ICategoryRepository, ICategoryModel };

import { makeCategoryRepository } from '../../repositories/category';
import { makeCategoryService, ICategoryService } from '../../services/category';

const makeCategoryContext = ({ categoryDb }): ICategoryService => {
  const categoryRepo = makeCategoryRepository({ categoryDb });

  return makeCategoryService({ categoryRepo });
};

export { makeCategoryContext, ICategoryService };

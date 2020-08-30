import { ICategoryRepository, ICategoryModel } from '../repositories/category';

interface ICategoryService {
  getCategoryById: (id: string) => Promise<ICategoryModel>;
  getCategoriesByIds: (ids: string[]) => Promise<ICategoryModel[]>;
  getCategories: () => Promise<ICategoryModel[]>;
  createCategory: (input: ICategoryModel) => Promise<ICategoryModel>;
}

interface ICategoryServiceDI {
  categoryRepo: ICategoryRepository;
}

const makeCategoryService = ({ categoryRepo }: ICategoryServiceDI): ICategoryService => {
  const getCategoryById = id => categoryRepo.getCategoryById(id);
  const getCategoriesByIds = ids => categoryRepo.getCategoriesByIds(ids);
  const getCategories = () => categoryRepo.getCategories();
  const createCategory = (input: ICategoryModel) => categoryRepo.createCategory(input);

  return {
    getCategoryById,
    getCategoriesByIds,
    getCategories,
    createCategory
  };
};

export { makeCategoryService, ICategoryService, ICategoryModel };

import { ICategoryRepository, ICategoryModel } from '../repositories/category';

interface ICategoryService {
  getCategoryById: (id: string) => Promise<ICategoryModel>;
  getCategoriesByIds: (ids: string[]) => Promise<ICategoryModel[]>;
  getAllCategories: () => Promise<ICategoryModel[]>;
  createCategory: (input: ICategoryModel) => Promise<ICategoryModel>;
}

interface ICategoryServiceDI {
  categoryRepo: ICategoryRepository;
}

const makeCategoryService = ({ categoryRepo }: ICategoryServiceDI): ICategoryService => {
  const getCategoryById = id => categoryRepo.getCategoryById(id);
  const getCategoriesByIds = ids => categoryRepo.getCategoriesByIds(ids);
  const getAllCategories = () => categoryRepo.getAllCategories();
  const createCategory = (input: ICategoryModel) => categoryRepo.createCategory(input);

  return {
    getCategoryById,
    getCategoriesByIds,
    getAllCategories,
    createCategory
  };
};

export { makeCategoryService, ICategoryService, ICategoryModel };

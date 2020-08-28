import { ICategoryRepository, ICategoryModel } from '../repositories/category';

interface ICategoryService {
  getCategoryById: (id: string) => Promise<ICategoryModel | null>;
  getCategoriesByIds: (ids: string[]) => Promise<ICategoryModel[] | null>;
  getAllCategories: () => Promise<ICategoryModel[] | null>;
  addCategory: (input: ICategoryModel) => Promise<ICategoryModel | null>;
}

interface ICategoryServiceDI {
  categoryRepo: ICategoryRepository;
}

const makeCategoryService = ({ categoryRepo }: ICategoryServiceDI): ICategoryService => {
  const getCategoryById = id => categoryRepo.getCategoryById(id);
  const getCategoriesByIds = ids => categoryRepo.getCategoriesByIds(ids);
  const getAllCategories = () => categoryRepo.getAllCategories();
  const addCategory = (input: ICategoryModel) => categoryRepo.addCategory(input);

  return {
    getCategoryById,
    getCategoriesByIds,
    getAllCategories,
    addCategory
  };
};

export { makeCategoryService, ICategoryService, ICategoryModel };

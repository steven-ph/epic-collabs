import { ICategoryRepository, ICategory, IAddCategoryInput } from '../repositories/category';

interface ICategoryService {
  getCategoryById: (id: string) => Promise<ICategory | null>;
  getCategoriesByIds: (ids: string[]) => Promise<ICategory[] | null>;
  getAllCategories: () => Promise<ICategory[] | null>;
  addCategory: (input: IAddCategoryInput) => Promise<ICategory | null>;
}

interface ICategoryServiceDI {
  categoryRepo: ICategoryRepository;
}

const makeCategoryService = ({ categoryRepo }: ICategoryServiceDI): ICategoryService => {
  const getCategoryById = id => categoryRepo.getCategoryById(id);
  const getCategoriesByIds = ids => categoryRepo.getCategoriesByIds(ids);
  const getAllCategories = () => categoryRepo.getAllCategories();
  const addCategory = (input: IAddCategoryInput) => categoryRepo.addCategory(input);

  return {
    getCategoryById,
    getCategoriesByIds,
    getAllCategories,
    addCategory
  };
};

export { makeCategoryService, ICategoryService, ICategory };

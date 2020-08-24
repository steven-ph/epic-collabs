import { makeCategoryRepository, ICategoryRepository } from '../category';

const mockCategory = {
  id: 'cat-id',
  name: 'Cat name',
  description: 'Cat ID Desc',
  picture: 'picture',
  createdBy: 'blah',
  createdAt: 12345,
  updatedAt: 12345
};

const mockCreate = jest.fn();
const mockFind = jest.fn().mockReturnThis();
const mockExec = jest.fn();

const mockCategoryDb = {
  create: mockCreate,
  find: mockFind,
  where: jest.fn().mockReturnThis(),
  in: jest.fn().mockReturnThis(),
  exec: mockExec
};

describe('CategoryRepository', () => {
  let categoryRepo: ICategoryRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    categoryRepo = makeCategoryRepository({ categoryDb: mockCategoryDb });
  });

  describe('#login', () => {
    it('should create a category in the db', async () => {
      mockCreate.mockResolvedValue(mockCategory);

      const res = await categoryRepo.addCategory({ name: 'Cat name', createdBy: 'blah' });

      expect(res).toEqual(mockCategory);
      expect(mockCreate).toHaveBeenCalledWith({ name: 'Cat name', createdBy: 'blah' });
    });

    it('should not create a category in the db if createdBy is missing', async () => {
      // @ts-ignore
      const result = await categoryRepo.addCategory({ name: 'Cat name' });

      expect(result).toEqual(null);
      expect(mockFind).not.toHaveBeenCalled();
      expect(mockCreate).not.toHaveBeenCalled();
    });

    it('should not create a category in the db if category name is missing', async () => {
      // @ts-ignore
      const result = await categoryRepo.addCategory({ createdBy: 'blah' });

      expect(result).toEqual(null);
      expect(mockFind).not.toHaveBeenCalled();
      expect(mockCreate).not.toHaveBeenCalled();
    });
  });

  // describe('#getCategoryById', () => {
  //   it('should get category by id', async () => {
  //     mockExec.mockResolvedValue([mockCategory]);

  //     const response = await categoryRepo.getCategoryById('cat-id');

  //     expect(response).toEqual(mockCategory);
  //   });
  // });

  // describe('#getCategoriesByIds', () => {
  //   it('should get multiple categories by ids', async () => {
  //     mockExec.mockResolvedValue([mockCategory]);

  //     const response = await categoryRepo.getCategoriesByIds(['cat-id']);

  //     expect(response).toEqual([mockCategory]);
  //   });
  // });

  describe('#getAllCategories', () => {
    it('should get all', async () => {
      mockFind.mockResolvedValue([mockCategory]);

      const response = await categoryRepo.getAllCategories();

      expect(response).toEqual([mockCategory]);
    });
  });
});

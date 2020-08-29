import { makeCategoryService } from '../category';

const mockGetById = jest.fn();
const mockGetByIds = jest.fn();
const mockGetAll = jest.fn();
const mockAdd = jest.fn();

const mockRepo = {
  getCategoryById: mockGetById,
  getCategoriesByIds: mockGetByIds,
  getAllCategories: mockGetAll,
  createCategory: mockAdd
};

const mockCategory = {
  _id: 'mock-id',
  name: 'some-name',
  createdBy: 'some-user'
};

describe('CategoryService', () => {
  const service = makeCategoryService({ categoryRepo: mockRepo });

  describe('getCategoryById', () => {
    it('should get category by id', async () => {
      mockGetById.mockResolvedValue(mockCategory);

      const res = await service.getCategoryById('mock-id');

      expect(res).toEqual(mockCategory);
      expect(mockGetById).toHaveBeenCalledWith('mock-id');
    });
  });

  describe('getCategoriesByIds', () => {
    it('should get categories by ids', async () => {
      mockGetByIds.mockResolvedValue([mockCategory]);

      const res = await service.getCategoriesByIds(['mock-id']);

      expect(res).toEqual([mockCategory]);
      expect(mockGetByIds).toHaveBeenCalledWith(['mock-id']);
    });
  });

  describe('getAllCategories', () => {
    it('should get all categories', async () => {
      mockGetAll.mockResolvedValue([mockCategory]);

      const res = await service.getAllCategories();

      expect(res).toEqual([mockCategory]);
      expect(mockGetAll).toHaveBeenCalled();
    });
  });

  describe('createCategory', () => {
    it('should add a category', async () => {
      mockAdd.mockResolvedValue(mockCategory);

      const res = await service.createCategory({ name: 'some-name', createdBy: 'some-user' });

      expect(res).toEqual(mockCategory);
      expect(mockAdd).toHaveBeenCalledWith({ name: 'some-name', createdBy: 'some-user' });
    });
  });
});

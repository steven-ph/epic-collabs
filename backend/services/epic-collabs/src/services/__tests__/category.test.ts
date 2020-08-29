import { makeCategoryService } from '../category';

const mockRepo = {
  getCategoryById: jest.fn(),
  getCategoriesByIds: jest.fn(),
  getAllCategories: jest.fn(),
  createCategory: jest.fn()
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
      mockRepo.getCategoryById.mockResolvedValue(mockCategory);

      const res = await service.getCategoryById('mock-id');

      expect(res).toEqual(mockCategory);
      expect(mockRepo.getCategoryById).toHaveBeenCalledWith('mock-id');
    });
  });

  describe('getCategoriesByIds', () => {
    it('should get categories by ids', async () => {
      mockRepo.getCategoriesByIds.mockResolvedValue([mockCategory]);

      const res = await service.getCategoriesByIds(['mock-id']);

      expect(res).toEqual([mockCategory]);
      expect(mockRepo.getCategoriesByIds).toHaveBeenCalledWith(['mock-id']);
    });
  });

  describe('getAllCategories', () => {
    it('should get all categories', async () => {
      mockRepo.getAllCategories.mockResolvedValue([mockCategory]);

      const res = await service.getAllCategories();

      expect(res).toEqual([mockCategory]);
      expect(mockRepo.getAllCategories).toHaveBeenCalled();
    });
  });

  describe('createCategory', () => {
    it('should add a category', async () => {
      mockRepo.createCategory.mockResolvedValue(mockCategory);

      const res = await service.createCategory({ name: 'some-name', createdBy: 'some-user' });

      expect(res).toEqual(mockCategory);
      expect(mockRepo.createCategory).toHaveBeenCalledWith({ name: 'some-name', createdBy: 'some-user' });
    });
  });
});

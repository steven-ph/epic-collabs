import { makeProjectService } from '../project';

const mockGetById = jest.fn();
const mockGetByCatId = jest.fn();
const mockGetByPosId = jest.fn();
const mockGetByUserId = jest.fn();
const mockGetByIds = jest.fn();
const mockGetAll = jest.fn();
const mockAdd = jest.fn();
const mockUpdate = jest.fn();

const mockRepo = {
  getProjectById: mockGetById,
  getProjectsByIds: mockGetByIds,
  getProjectsByCategoryId: mockGetByCatId,
  getProjectsByPositionId: mockGetByPosId,
  getProjectsByUserId: mockGetByUserId,
  getAllProjects: mockGetAll,
  createProject: mockAdd,
  updateProject: mockUpdate
};

const mockProject = {
  _id: 'mock-id',
  slug: 'mock-slug',
  name: 'some-name',
  description: 'mock-description',
  createdBy: 'some-user',
  categories: ['mock-cat'],
  createdAt: 12345,
  updatedAt: 12345
};

describe('ProjectService', () => {
  const service = makeProjectService({ projectRepo: mockRepo });

  describe('getProjectById', () => {
    it('should get project by id', async () => {
      mockGetById.mockResolvedValue(mockProject);

      const res = await service.getProjectById('mock-id');

      expect(res).toEqual(mockProject);
      expect(mockGetById).toHaveBeenCalledWith('mock-id');
    });
  });

  describe('getProjectsByUserId', () => {
    it('should get project by userId', async () => {
      mockGetByUserId.mockResolvedValue(mockProject);

      const res = await service.getProjectsByUserId('mock-id');

      expect(res).toEqual(mockProject);
      expect(mockGetByUserId).toHaveBeenCalledWith('mock-id');
    });
  });

  describe('getProjectsByCategoryId', () => {
    it('should get project by categoryId', async () => {
      mockGetByCatId.mockResolvedValue(mockProject);

      const res = await service.getProjectsByCategoryId('mock-id');

      expect(res).toEqual(mockProject);
      expect(mockGetByCatId).toHaveBeenCalledWith('mock-id');
    });
  });

  describe('getProjectsByPositionId', () => {
    it('should get project by positionId', async () => {
      mockGetByPosId.mockResolvedValue(mockProject);

      const res = await service.getProjectsByPositionId('mock-id');

      expect(res).toEqual(mockProject);
      expect(mockGetByPosId).toHaveBeenCalledWith('mock-id');
    });
  });

  describe('getProjectsByIds', () => {
    it('should get projects by ids', async () => {
      mockGetByIds.mockResolvedValue([mockProject]);

      const res = await service.getProjectsByIds(['mock-id']);

      expect(res).toEqual([mockProject]);
      expect(mockGetByIds).toHaveBeenCalledWith(['mock-id']);
    });
  });

  describe('getAllProjects', () => {
    it('should get all projects', async () => {
      mockGetAll.mockResolvedValue([mockProject]);

      const res = await service.getAllProjects();

      expect(res).toEqual([mockProject]);
      expect(mockGetAll).toHaveBeenCalled();
    });
  });

  describe('createProject', () => {
    it('should add a project', async () => {
      mockAdd.mockResolvedValue(mockProject);

      const res = await service.createProject({ slug: 'mock-slug', name: 'some-name', description: 'mock-description', createdBy: 'some-user' });

      expect(res).toEqual(mockProject);
      expect(mockAdd).toHaveBeenCalledWith({ slug: 'mock-slug', name: 'some-name', description: 'mock-description', createdBy: 'some-user' });
    });
  });

  describe('updateProject', () => {
    it('should update a project', async () => {
      mockUpdate.mockResolvedValue(mockProject);

      const res = await service.updateProject({ slug: 'mock-slug', name: 'some-name', description: 'mock-description', createdBy: 'some-user' });

      expect(res).toEqual(mockProject);
      expect(mockUpdate).toHaveBeenCalledWith({ slug: 'mock-slug', name: 'some-name', description: 'mock-description', createdBy: 'some-user' });
    });
  });
});

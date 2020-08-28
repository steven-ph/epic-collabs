import { makeProjectService } from '../project';

const mockGetById = jest.fn();
const mockGetByIds = jest.fn();
const mockGetAll = jest.fn();
const mockAdd = jest.fn();

const mockRepo = {
  getProjectById: mockGetById,
  getProjectsByIds: mockGetByIds,
  getAllProjects: mockGetAll,
  addProject: mockAdd
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

  describe('addProject', () => {
    it('should add a project', async () => {
      mockAdd.mockResolvedValue(mockProject);

      const res = await service.addProject({ slug: 'mock-slug', name: 'some-name', description: 'mock-description', createdBy: 'some-user' });

      expect(res).toEqual(mockProject);
      expect(mockAdd).toHaveBeenCalledWith({ slug: 'mock-slug', name: 'some-name', description: 'mock-description', createdBy: 'some-user' });
    });
  });
});

import { makeProjectService } from '../project';

const mockRepo = {
  getProjectById: jest.fn(),
  getProjectsByIds: jest.fn(),
  getProjectsByCategoryId: jest.fn(),
  getProjectsByPositionId: jest.fn(),
  getProjectsByUserId: jest.fn(),
  getProjects: jest.fn(),
  createProject: jest.fn(),
  updateProject: jest.fn(),
  changeProjectOwnership: jest.fn()
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
      mockRepo.getProjectById.mockResolvedValue(mockProject);

      const res = await service.getProjectById('mock-id');

      expect(res).toEqual(mockProject);
      expect(mockRepo.getProjectById).toHaveBeenCalledWith('mock-id');
    });
  });

  describe('getProjectsByUserId', () => {
    it('should get project by userId', async () => {
      mockRepo.getProjectsByUserId.mockResolvedValue(mockProject);

      const res = await service.getProjectsByUserId('mock-id');

      expect(res).toEqual(mockProject);
      expect(mockRepo.getProjectsByUserId).toHaveBeenCalledWith('mock-id');
    });
  });

  describe('getProjectsByCategoryId', () => {
    it('should get project by categoryId', async () => {
      mockRepo.getProjectsByCategoryId.mockResolvedValue(mockProject);

      const res = await service.getProjectsByCategoryId('mock-id');

      expect(res).toEqual(mockProject);
      expect(mockRepo.getProjectsByCategoryId).toHaveBeenCalledWith('mock-id');
    });
  });

  describe('getProjectsByPositionId', () => {
    it('should get project by positionId', async () => {
      mockRepo.getProjectsByPositionId.mockResolvedValue(mockProject);

      const res = await service.getProjectsByPositionId('mock-id');

      expect(res).toEqual(mockProject);
      expect(mockRepo.getProjectsByPositionId).toHaveBeenCalledWith('mock-id');
    });
  });

  describe('getProjectsByIds', () => {
    it('should get projects by ids', async () => {
      mockRepo.getProjectsByIds.mockResolvedValue([mockProject]);

      const res = await service.getProjectsByIds(['mock-id']);

      expect(res).toEqual([mockProject]);
      expect(mockRepo.getProjectsByIds).toHaveBeenCalledWith(['mock-id']);
    });
  });

  describe('getProjects', () => {
    it('should get projects', async () => {
      mockRepo.getProjects.mockResolvedValue([mockProject]);

      const res = await service.getProjects();

      expect(res).toEqual([mockProject]);
      expect(mockRepo.getProjects).toHaveBeenCalled();
    });
  });

  describe('createProject', () => {
    it('should add a project', async () => {
      mockRepo.createProject.mockResolvedValue(mockProject);

      const res = await service.createProject({ slug: 'mock-slug', name: 'some-name', description: 'mock-description', createdBy: 'some-user' });

      expect(res).toEqual(mockProject);
      expect(mockRepo.createProject).toHaveBeenCalledWith({
        slug: 'mock-slug',
        name: 'some-name',
        description: 'mock-description',
        createdBy: 'some-user'
      });
    });
  });

  describe('updateProject', () => {
    it('should update a project', async () => {
      mockRepo.updateProject.mockResolvedValue(mockProject);

      const res = await service.updateProject({ slug: 'mock-slug', name: 'some-name', description: 'mock-description', createdBy: 'some-user' });

      expect(res).toEqual(mockProject);
      expect(mockRepo.updateProject).toHaveBeenCalledWith({
        slug: 'mock-slug',
        name: 'some-name',
        description: 'mock-description',
        createdBy: 'some-user'
      });
    });
  });

  describe('changeProjectOwnership', () => {
    it('should change ownership of a project', async () => {
      mockRepo.changeProjectOwnership.mockResolvedValue({ ...mockProject, createdBy: 'new-userId' });

      const input = { projectId: mockProject._id, fromUserId: mockProject.createdBy, toUserId: 'new-userId' };
      const res = await service.changeProjectOwnership({ ...input });

      expect(res).toEqual({ ...mockProject, createdBy: 'new-userId' });
      expect(mockRepo.changeProjectOwnership).toHaveBeenCalledWith({ ...input });
    });
  });
});

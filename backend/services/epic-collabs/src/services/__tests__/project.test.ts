jest.mock('shortid', () => ({
  generate: jest.fn().mockReturnValue('random-string')
}));

import { makeProjectService } from '../project';

const mockRepo = {
  getProjectById: jest.fn(),
  getProjectBySlug: jest.fn(),
  getProjectsByIds: jest.fn(),
  getProjectsByCategoryId: jest.fn(),
  getProjectsByPositionId: jest.fn(),
  getProjectsByUserId: jest.fn(),
  getProjects: jest.fn(),
  createProject: jest.fn(),
  updateProject: jest.fn()
};

const mockProject = {
  _id: 'mock-id',
  name: 'some-name',
  slug: 'some-slug',
  description: 'mock-description',
  categories: ['mock-cat'],
  createdBy: 'some-user',
  createdAt: 12345,
  updatedAt: 12345,
  collaborators: [
    {
      positionId: 'mock-positionId',
      userId: 'mock-userId'
    }
  ]
};

describe('ProjectService', () => {
  const service = makeProjectService({ projectRepo: mockRepo });

  describe('#createProject', () => {
    it('should create a project in the db', async () => {
      mockRepo.createProject.mockResolvedValue(mockProject);

      const res = await service.createProject({
        name: 'Project name',
        description: 'description',
        categories: ['mock-cat'],
        createdBy: 'blah'
      });

      expect(res).toEqual(mockProject);

      expect(mockRepo.createProject).toHaveBeenCalledWith({
        name: 'Project name',
        slug: 'project-name-random-string-random-string',
        description: 'description',
        categories: ['mock-cat'],
        createdBy: 'blah'
      });
    });

    it('should not create a project in the db if the input is invalid', () => {
      return expect(() =>
        service.createProject({ name: 'project name', slug: 'slug', categories: ['mock-cat'], description: 'description' })
      ).toThrow();
    });
  });

  describe('#updateProject', () => {
    it('should not update the project in the db if the input is invalid', () => {
      return expect(() => service.updateProject({ name: 'project name', slug: 'slug', description: 'description' })).rejects.toThrow();
    });

    it('should not update the project in the db if it does not exist', () => {
      mockRepo.getProjectById.mockResolvedValue(null);
      return expect(() => service.updateProject({ ...mockProject, updatedBy: 'blah' })).rejects.toThrow('updateProject error: project not found');
    });

    it('should not update the project in the db if the user is not the project owner or collaborator', () => {
      mockRepo.getProjectById.mockResolvedValue(mockProject);
      return expect(() => service.updateProject({ ...mockProject, updatedBy: 'blah' })).rejects.toThrow(
        'updateProject error: user is not the project owner or collaborator'
      );
    });

    it('should not update the project in the db with change of ownership if the user is not the project owner', () => {
      mockRepo.getProjectById.mockResolvedValue(mockProject);
      return expect(() => service.updateProject({ ...mockProject, createdBy: 'mock-userId', updatedBy: 'mock-userId' })).rejects.toThrow(
        'updateProject error: user is not the project owner'
      );
    });

    it('should update the project ownership in the db if the user is the owner', async () => {
      mockRepo.getProjectById.mockResolvedValue(mockProject);
      mockRepo.updateProject.mockResolvedValue(mockProject);

      const res = await service.updateProject({ ...mockProject, createdBy: 'mock-userId', updatedBy: 'some-user' });

      expect(res).toEqual(mockProject);

      expect(mockRepo.updateProject).toHaveBeenCalledWith({ ...mockProject, createdBy: 'mock-userId', updatedBy: 'some-user' });
    });

    it('should update the project in the db if the user is the owner', async () => {
      mockRepo.getProjectById.mockResolvedValue(mockProject);
      mockRepo.updateProject.mockResolvedValue(mockProject);

      const res = await service.updateProject({ ...mockProject, updatedBy: 'some-user' });

      expect(res).toEqual(mockProject);

      expect(mockRepo.updateProject).toHaveBeenCalledWith({ ...mockProject, updatedBy: 'some-user' });
    });

    it('should update the project in the db if the user is the collaborator', async () => {
      mockRepo.getProjectById.mockResolvedValue(mockProject);
      mockRepo.updateProject.mockResolvedValue(mockProject);

      const res = await service.updateProject({ ...mockProject, updatedBy: 'mock-userId' });

      expect(res).toEqual(mockProject);

      expect(mockRepo.updateProject).toHaveBeenCalledWith({ ...mockProject, updatedBy: 'mock-userId' });
    });
  });

  describe('getProjectById', () => {
    it('should get project by id', async () => {
      mockRepo.getProjectById.mockResolvedValue(mockProject);

      const res = await service.getProjectById('mock-id');

      expect(res).toEqual(mockProject);
      expect(mockRepo.getProjectById).toHaveBeenCalledWith('mock-id');
    });
  });

  describe('getProjectBySlug', () => {
    it('should get project by project slug', async () => {
      mockRepo.getProjectBySlug.mockResolvedValue(mockProject);

      const res = await service.getProjectBySlug('some-slug');

      expect(res).toEqual(mockProject);
      expect(mockRepo.getProjectBySlug).toHaveBeenCalledWith('some-slug');
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
});

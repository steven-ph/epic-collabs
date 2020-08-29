const mockClear = jest.fn();
const mockLoad = jest.fn();
const mockLoadMany = jest.fn();
jest.mock('dataloader', () =>
  jest.fn(() => ({
    clear: mockClear,
    load: mockLoad,
    loadMany: mockLoadMany
  }))
);

const mockFindMany = jest.fn();
jest.mock('../../utils/dataloader', () => ({
  mongoFindMany: mockFindMany
}));

import { makeProjectRepository, IProjectRepository } from '../project';

const mockProject = {
  _id: 'mock-id',
  slug: 'mock-slug',
  name: 'some-name',
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

const mockCreate = jest.fn();
const mockFind = jest.fn().mockReturnThis();
const mockExec = jest.fn();
const mockFindOneAndUpdate = jest.fn();

const mockProjectDb = {
  create: mockCreate,
  findOneAndUpdate: mockFindOneAndUpdate,
  find: mockFind,
  where: jest.fn().mockReturnThis(),
  in: jest.fn().mockReturnThis(),
  exec: mockExec
};

describe('ProjectRepository', () => {
  let projectRepo: IProjectRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    projectRepo = makeProjectRepository({ projectDb: mockProjectDb });
  });

  describe('#createProject', () => {
    it('should create a project in the db', async () => {
      mockCreate.mockResolvedValue(mockProject);

      const res = await projectRepo.createProject({
        name: 'project name',
        slug: 'slug',
        description: 'description',
        categories: ['mock-cat'],
        createdBy: 'blah'
      });

      expect(res).toEqual(mockProject);

      expect(mockCreate).toHaveBeenCalledWith({
        name: 'project name',
        slug: 'slug',
        description: 'description',
        categories: ['mock-cat'],
        createdBy: 'blah'
      });
    });

    it('should not create a project in the db if the input is invalid', () => {
      return expect(() =>
        projectRepo.createProject({ name: 'project name', slug: 'slug', categories: ['mock-cat'], description: 'description' })
      ).toThrow();
    });
  });

  describe('#updateProject', () => {
    beforeEach(() => {
      mockLoad.mockReset();
    });

    it('should not update the project in the db if the input is invalid', () => {
      return expect(() => projectRepo.updateProject({ name: 'project name', slug: 'slug', description: 'description' })).rejects.toThrow();
    });

    it('should not update the project in the db if it does not exist', () => {
      mockLoad.mockResolvedValue(null);
      return expect(() => projectRepo.updateProject({ ...mockProject, updatedBy: 'blah' })).rejects.toThrow('updateProject error: project not found');
    });

    it('should not update the project in the db if the user is not the project owner or collaborator', () => {
      mockLoad.mockResolvedValue(mockProject);
      return expect(() => projectRepo.updateProject({ ...mockProject, updatedBy: 'blah' })).rejects.toThrow(
        'updateProject error: user is not the project owner'
      );
    });

    it('should update the project in the db if the user is the owner', async () => {
      mockLoad.mockResolvedValue(mockProject);
      mockFindOneAndUpdate.mockResolvedValue(mockProject);

      const res = await projectRepo.updateProject({ ...mockProject, updatedBy: 'some-user' });

      expect(res).toEqual(mockProject);

      expect(mockClear).toHaveBeenCalled();

      expect(mockFindOneAndUpdate).toHaveBeenCalledWith(
        { _id: mockProject._id },
        { ...mockProject },
        { new: true, upsert: true, omitUndefined: true }
      );
    });

    it('should update the project in the db if the user is the collaborator', async () => {
      mockLoad.mockResolvedValue(mockProject);
      mockFindOneAndUpdate.mockResolvedValue(mockProject);

      const res = await projectRepo.updateProject({ ...mockProject, updatedBy: 'mock-userId' });

      expect(res).toEqual(mockProject);

      expect(mockClear).toHaveBeenCalled();

      expect(mockFindOneAndUpdate).toHaveBeenCalledWith(
        { _id: mockProject._id },
        { ...mockProject },
        { new: true, upsert: true, omitUndefined: true }
      );
    });
  });

  describe('#changeProjectOwnership', () => {
    const input = { projectId: mockProject._id, fromUserId: 'some-user', toUserId: 'new-userid' };
    beforeEach(() => {
      mockLoad.mockReset();
    });

    it('should not change the ownership of the project in the db if the input is invalid', () => {
      // @ts-ignore
      return expect(() => projectRepo.changeProjectOwnership({ foo: 'bar' })).rejects.toThrow();
    });

    it('should not change the ownership of the project in the db if it does not exist', () => {
      mockLoad.mockResolvedValue(null);
      return expect(() => projectRepo.changeProjectOwnership({ ...input })).rejects.toThrow('changeProjectOwnership error: project not found');
    });

    it('should not change the ownership of the project in the db if the user is not the project owner', () => {
      mockLoad.mockResolvedValue({ ...mockProject, createdBy: 'blah-id' });
      return expect(() => projectRepo.changeProjectOwnership({ ...input })).rejects.toThrow(
        'changeProjectOwnership error: user is not the project owner'
      );
    });

    it('should change the ownership of the project in the db', async () => {
      mockLoad.mockResolvedValue(mockProject);
      mockFindOneAndUpdate.mockResolvedValue({ ...mockProject, createdBy: 'new-userid' });

      const res = await projectRepo.changeProjectOwnership({ ...input });

      expect(res).toEqual({ ...mockProject, createdBy: 'new-userid' });

      expect(mockClear).toHaveBeenCalled();

      expect(mockFindOneAndUpdate).toHaveBeenCalledWith(
        { _id: mockProject._id },
        { ...mockProject, createdBy: 'new-userid' },
        { new: true, upsert: true, omitUndefined: true }
      );
    });
  });

  describe('#getProjectById', () => {
    it('should get project by id', async () => {
      mockLoad.mockResolvedValue(mockProject);

      const response = await projectRepo.getProjectById('mock-id');

      expect(response).toEqual(mockProject);
    });
  });

  describe('#getProjectsByUserId', () => {
    it('should get project by userId', async () => {
      mockFind.mockResolvedValue(mockProject);

      const response = await projectRepo.getProjectsByUserId('mock-id');

      expect(response).toEqual(mockProject);
    });
  });

  describe('#getProjectsByCategoryId', () => {
    it('should get project by categoryId', async () => {
      mockFindMany.mockResolvedValue([mockProject]);

      const response = await projectRepo.getProjectsByCategoryId('mock-id');

      expect(response).toEqual([mockProject]);
    });
  });

  describe('#getProjectsByPositionId', () => {
    it('should get project by positionId', async () => {
      mockFind.mockResolvedValue(mockProject);

      const response = await projectRepo.getProjectsByPositionId('mock-id');

      expect(response).toEqual(mockProject);
    });
  });

  describe('#getProjectsByIds', () => {
    it('should get multiple project by ids', async () => {
      mockLoadMany.mockResolvedValue([mockProject]);

      const response = await projectRepo.getProjectsByIds(['mock-id']);

      expect(response).toEqual([mockProject]);
    });
  });

  describe('#getAllProjects', () => {
    it('should get all', async () => {
      mockFind.mockResolvedValue([mockProject]);

      const response = await projectRepo.getAllProjects();

      expect(response).toEqual([mockProject]);
    });
  });
});

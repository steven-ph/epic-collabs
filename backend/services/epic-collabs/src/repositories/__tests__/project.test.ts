import { makeProjectRepository, IProjectRepository } from '../project';

const mockLoad = jest.fn();
const mockLoadMany = jest.fn();
jest.mock('dataloader', () =>
  jest.fn(() => ({
    load: mockLoad,
    loadMany: mockLoadMany
  }))
);

const mockProject = {
  _id: 'mock-id',
  slug: 'mock-slug',
  name: 'some-name',
  description: 'mock-description',
  categories: ['mock-cat'],
  createdBy: 'some-user',
  createdAt: 12345,
  updatedAt: 12345
};

const mockCreate = jest.fn();
const mockFind = jest.fn().mockReturnThis();
const mockExec = jest.fn();

const mockProjectDb = {
  create: mockCreate,
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

  describe('#addProject', () => {
    it('should create a project in the db', async () => {
      mockCreate.mockResolvedValue(mockProject);

      const res = await projectRepo.addProject({
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

    it('should not create a project in the db if createdBy is missing', async () => {
      // @ts-ignore
      const result = await projectRepo.addProject({ name: 'project name', slug: 'slug', categories: ['mock-cat'], description: 'description' });

      expect(result).toEqual(null);
      expect(mockFind).not.toHaveBeenCalled();
      expect(mockCreate).not.toHaveBeenCalled();
    });

    it('should not create a project in the db if project name is missing', async () => {
      // @ts-ignore
      const result = await projectRepo.addProject({ slug: 'slug', description: 'description', categories: ['mock-cat'], createdBy: 'blah' });

      expect(result).toEqual(null);
      expect(mockFind).not.toHaveBeenCalled();
      expect(mockCreate).not.toHaveBeenCalled();
    });

    it('should not create a project in the db if project slug is missing', async () => {
      // @ts-ignore
      const result = await projectRepo.addProject({ name: 'project name', description: 'description', categories: ['mock-cat'], createdBy: 'blah' });

      expect(result).toEqual(null);
      expect(mockFind).not.toHaveBeenCalled();
      expect(mockCreate).not.toHaveBeenCalled();
    });

    it('should not create a project in the db if project description is missing', async () => {
      // @ts-ignore
      const result = await projectRepo.addProject({ name: 'project name', slug: 'slug', categories: ['mock-cat'], createdBy: 'blah' });

      expect(result).toEqual(null);
      expect(mockFind).not.toHaveBeenCalled();
      expect(mockCreate).not.toHaveBeenCalled();
    });

    it('should not create a project in the db if project category is missing', async () => {
      // @ts-ignore
      const result = await projectRepo.addProject({ name: 'project name', slug: 'slug', createdBy: 'blah' });

      expect(result).toEqual(null);
      expect(mockFind).not.toHaveBeenCalled();
      expect(mockCreate).not.toHaveBeenCalled();
    });
  });

  describe('#getProjectById', () => {
    it('should get project by id', async () => {
      mockLoad.mockResolvedValue(mockProject);

      const response = await projectRepo.getProjectById('mock-id');

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

import { makeUserRepository, IUserRepository } from '../user';

const mockLoad = jest.fn();
const mockLoadMany = jest.fn();
jest.mock('dataloader', () =>
  jest.fn(() => ({
    load: mockLoad,
    loadMany: mockLoadMany
  }))
);

const mockUser = {
  _id: 'johndoe',
  email: 'john@doe.com',
  username: 'john@doe.com',
  picture: 'picture',
  name: 'john doe',
  firstName: 'john',
  lastName: 'doe',
  bio: 'blah',
  createdAt: 12345,
  emailVerified: true
};

const mockProject = {
  _id: 'mock-projectId',
  slug: 'mock-slug',
  name: 'some-name',
  description: 'mock-description',
  categories: ['mock-cat'],
  createdBy: 'some-user',
  collaborators: [
    {
      positionId: 'mock-positionId'
    }
  ],
  createdAt: 12345,
  updatedAt: 12345
};

const mockFindOneAndUpdate = jest.fn();

const mockUserDb = {
  findOneAndUpdate: mockFindOneAndUpdate
};

const projectService = {
  getProjectById: jest.fn(),
  updateProject: jest.fn()
};

describe('UserRepository', () => {
  let userRepo: IUserRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    // @ts-ignore
    userRepo = makeUserRepository({ userDb: mockUserDb, projectService });
  });

  describe('#handleLogin', () => {
    it('should upsert user in the db', async () => {
      mockFindOneAndUpdate.mockResolvedValue(mockUser);

      const res = await userRepo.handleLogin({ ...mockUser });

      expect(res).toEqual(mockUser);
      expect(mockFindOneAndUpdate).toHaveBeenCalledWith(
        { _id: mockUser._id },
        { ...mockUser },
        { new: true, lean: true, upsert: true, omitUndefined: true }
      );
    });

    it('should not upsert user in the db if the input is invalid', () => {
      return expect(() => userRepo.handleLogin({ name: 'johndoe' })).rejects.toThrow();
    });
  });

  describe('#joinProject', () => {
    const input = { projectId: 'mock-projectId', userId: 'johndoe', positionId: 'mock-positionId' };
    beforeEach(() => {
      mockLoad.mockReset();
    });

    it('should not join the project if the input is invalid', async () => {
      // @ts-ignore
      const res = await userRepo.joinProject({ foo: 'bar' });

      expect(res).toEqual(false);
    });

    it('should not join the user if it does not exist', async () => {
      mockLoad.mockResolvedValue(null);
      projectService.getProjectById.mockResolvedValue(mockProject);
      const res = await userRepo.joinProject({ ...input });

      expect(res).toEqual(false);
    });

    it('should not join the project if it does not exist', async () => {
      mockLoad.mockResolvedValue(mockUser);
      projectService.getProjectById.mockResolvedValue(null);
      const res = await userRepo.joinProject({ ...input });

      expect(res).toEqual(false);
    });

    it('should handle an error', async () => {
      mockLoad.mockResolvedValue(mockUser);
      projectService.getProjectById.mockRejectedValue(new Error('some error'));
      const res = await userRepo.joinProject({ ...input });

      expect(res).toEqual(false);
    });

    it('should join the project', async () => {
      mockLoad.mockResolvedValue(mockUser);
      projectService.getProjectById.mockResolvedValue(mockProject);

      const res = await userRepo.joinProject({ ...input });

      expect(res).toEqual(true);
    });
  });

  describe('#followProject', () => {
    const input = { projectId: 'mock-projectId', userId: 'johndoe' };
    beforeEach(() => {
      mockLoad.mockReset();
    });

    it('should not follow the project if the input is invalid', async () => {
      // @ts-ignore
      const res = await userRepo.followProject({ foo: 'bar' });

      expect(res).toEqual(false);
    });

    it('should not follow the user if it does not exist', async () => {
      mockLoad.mockResolvedValue(null);
      projectService.getProjectById.mockResolvedValue(mockProject);
      const res = await userRepo.followProject({ ...input });

      expect(res).toEqual(false);
    });

    it('should not follow the project if it does not exist', async () => {
      mockLoad.mockResolvedValue(mockUser);
      projectService.getProjectById.mockResolvedValue(null);
      const res = await userRepo.followProject({ ...input });

      expect(res).toEqual(false);
    });

    it('should handle an error', async () => {
      mockLoad.mockResolvedValue(mockUser);
      projectService.getProjectById.mockRejectedValue(new Error('some error'));
      const res = await userRepo.followProject({ ...input });

      expect(res).toEqual(false);
    });

    it('should follow the project', async () => {
      mockLoad.mockResolvedValue(mockUser);
      projectService.getProjectById.mockResolvedValue(mockProject);

      const res = await userRepo.followProject({ ...input });

      expect(res).toEqual(true);
    });
  });

  describe('#unfollowProject', () => {
    const input = { projectId: 'mock-projectId', userId: 'johndoe' };
    beforeEach(() => {
      mockLoad.mockReset();
    });

    it('should not unfollow the project if the input is invalid', async () => {
      // @ts-ignore
      const res = await userRepo.unfollowProject({ foo: 'bar' });

      expect(res).toEqual(false);
    });

    it('should not unfollow the user if it does not exist', async () => {
      mockLoad.mockResolvedValue(null);
      projectService.getProjectById.mockResolvedValue(mockProject);
      const res = await userRepo.unfollowProject({ ...input });

      expect(res).toEqual(false);
    });

    it('should not unfollow the project if it does not exist', async () => {
      mockLoad.mockResolvedValue(mockUser);
      projectService.getProjectById.mockResolvedValue(null);
      const res = await userRepo.unfollowProject({ ...input });

      expect(res).toEqual(false);
    });

    it('should handle an error', async () => {
      mockLoad.mockResolvedValue(mockUser);
      projectService.getProjectById.mockRejectedValue(new Error('some error'));
      const res = await userRepo.unfollowProject({ ...input });

      expect(res).toEqual(false);
    });

    it('should unfollow the project', async () => {
      mockLoad.mockResolvedValue(mockUser);
      projectService.getProjectById.mockResolvedValue(mockProject);

      const res = await userRepo.unfollowProject({ ...input });

      expect(res).toEqual(true);
    });
  });

  describe('#leaveProject', () => {
    const input = { projectId: 'mock-projectId', userId: 'johndoe' };
    beforeEach(() => {
      mockLoad.mockReset();
    });

    it('should not leave the project if the input is invalid', async () => {
      // @ts-ignore
      const res = await userRepo.leaveProject({ foo: 'bar' });

      expect(res).toEqual(false);
    });

    it('should not leave the user if it does not exist', async () => {
      mockLoad.mockResolvedValue(null);
      projectService.getProjectById.mockResolvedValue(mockProject);
      const res = await userRepo.leaveProject({ ...input });

      expect(res).toEqual(false);
    });

    it('should not leave the project if it does not exist', async () => {
      mockLoad.mockResolvedValue(mockUser);
      projectService.getProjectById.mockResolvedValue(null);
      const res = await userRepo.leaveProject({ ...input });

      expect(res).toEqual(false);
    });

    it('should not leave the project if the user is still the owner', async () => {
      mockLoad.mockResolvedValue(mockUser);
      projectService.getProjectById.mockResolvedValue({ ...mockProject, createdBy: 'johndoe' });
      const res = await userRepo.leaveProject({ ...input });

      expect(res).toEqual(false);
    });

    it('should handle an error', async () => {
      mockLoad.mockResolvedValue(mockUser);
      projectService.getProjectById.mockRejectedValue(new Error('some error'));
      const res = await userRepo.leaveProject({ ...input });

      expect(res).toEqual(false);
    });

    it('should leave the project', async () => {
      mockLoad.mockResolvedValue(mockUser);
      projectService.getProjectById.mockResolvedValue(mockProject);

      const res = await userRepo.leaveProject({ ...input });

      expect(res).toEqual(true);
    });
  });

  describe('#getUserById', () => {
    it('should get user by id', async () => {
      mockLoad.mockResolvedValue(mockUser);

      const response = await userRepo.getUserById('johndoe');

      expect(response).toEqual(mockUser);
    });
  });

  describe('#getUsersByIds', () => {
    it('should get multiple users by ids', async () => {
      mockLoadMany.mockResolvedValue([mockUser]);

      const response = await userRepo.getUsersByIds(['johndoe']);

      expect(response).toEqual([mockUser]);
    });
  });

  describe('#getUserByEmail', () => {
    it('should get user by email', async () => {
      mockLoad.mockResolvedValue(mockUser);

      const response = await userRepo.getUserByEmail('john@doe.com');

      expect(response).toEqual(mockUser);
    });
  });

  describe('#getUsersByEmails', () => {
    it('should get multiple users by emails', async () => {
      mockLoadMany.mockResolvedValue([mockUser]);

      const response = await userRepo.getUsersByEmails(['john@doe.com']);

      expect(response).toEqual([mockUser]);
    });
  });
});

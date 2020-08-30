import { makeUserService } from '../user';

const mockRepo = {
  handleLogin: jest.fn(),
  upsertUser: jest.fn(),
  getUserById: jest.fn(),
  getUsersByIds: jest.fn(),
  getUserByEmail: jest.fn(),
  getUsersByEmails: jest.fn(),
  joinProject: jest.fn(),
  followProject: jest.fn(),
  unfollowProject: jest.fn(),
  leaveProject: jest.fn(),
  removeUserFromProject: jest.fn(),
  removePositionFromProject: jest.fn(),
  changeProjectOwnership: jest.fn()
};

const mockUser = {
  _id: 'mock-id',
  name: 'some-name',
  email: 'some-email'
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

describe('UserService', () => {
  const service = makeUserService({ userRepo: mockRepo });

  describe('getUserById', () => {
    it('should get user by id', async () => {
      mockRepo.getUserById.mockResolvedValue(mockUser);

      const res = await service.getUserById('mock-id');

      expect(res).toEqual(mockUser);
      expect(mockRepo.getUserById).toHaveBeenCalledWith('mock-id');
    });
  });

  describe('getUsersByIds', () => {
    it('should get categories by ids', async () => {
      mockRepo.getUsersByIds.mockResolvedValue([mockUser]);

      const res = await service.getUsersByIds(['mock-id']);

      expect(res).toEqual([mockUser]);
      expect(mockRepo.getUsersByIds).toHaveBeenCalledWith(['mock-id']);
    });
  });

  describe('getUserByEmail', () => {
    it('should get user by email', async () => {
      mockRepo.getUserByEmail.mockResolvedValue(mockUser);

      const res = await service.getUserByEmail('some-email');

      expect(res).toEqual(mockUser);
      expect(mockRepo.getUserByEmail).toHaveBeenCalledWith('some-email');
    });
  });

  describe('getUsersByEmails', () => {
    it('should get users by emails', async () => {
      mockRepo.getUsersByEmails.mockResolvedValue([mockUser]);

      const res = await service.getUsersByEmails(['mock-id']);

      expect(res).toEqual([mockUser]);
      expect(mockRepo.getUsersByEmails).toHaveBeenCalledWith(['mock-id']);
    });
  });

  describe('handleLogin', () => {
    it('should log user in', async () => {
      mockRepo.handleLogin.mockResolvedValue(mockUser);

      const res = await service.handleLogin({ ...mockUser });

      expect(res).toEqual(mockUser);
      expect(mockRepo.handleLogin).toHaveBeenCalledWith({ ...mockUser });
    });
  });

  describe('joinProject', () => {
    it('should join a project', async () => {
      mockRepo.joinProject.mockResolvedValue(true);
      const input = { userId: mockUser._id, projectId: 'projectId', positionId: 'positionId' };
      const res = await service.joinProject({ ...input });

      expect(res).toBe(true);
      expect(mockRepo.joinProject).toHaveBeenCalledWith({ ...input });
    });
  });

  describe('followProject', () => {
    it('should follow a project', async () => {
      mockRepo.followProject.mockResolvedValue(true);
      const input = { userId: mockUser._id, projectId: 'projectId' };
      const res = await service.followProject({ ...input });

      expect(res).toBe(true);
      expect(mockRepo.followProject).toHaveBeenCalledWith({ ...input });
    });
  });

  describe('unfollowProject', () => {
    it('should unfollow a project', async () => {
      mockRepo.unfollowProject.mockResolvedValue(true);
      const input = { userId: mockUser._id, projectId: 'projectId' };
      const res = await service.unfollowProject({ ...input });

      expect(res).toBe(true);
      expect(mockRepo.unfollowProject).toHaveBeenCalledWith({ ...input });
    });
  });

  describe('leaveProject', () => {
    it('should leave a project', async () => {
      mockRepo.leaveProject.mockResolvedValue(true);
      const input = { userId: mockUser._id, projectId: 'projectId' };
      const res = await service.leaveProject({ ...input });

      expect(res).toBe(true);
      expect(mockRepo.leaveProject).toHaveBeenCalledWith({ ...input });
    });
  });

  describe('removeUserFromProject', () => {
    it('should remove a user from the project', async () => {
      mockRepo.removeUserFromProject.mockResolvedValue(true);
      const input = { ownerId: mockUser._id, projectId: 'projectId', positionId: 'mock-pos-id', userId: 'some-userId' };
      const res = await service.removeUserFromProject({ ...input });

      expect(res).toBe(true);
      expect(mockRepo.removeUserFromProject).toHaveBeenCalledWith({ ...input });
    });
  });

  describe('removePositionFromProject', () => {
    it('should remove a position from the project', async () => {
      mockRepo.removePositionFromProject.mockResolvedValue(true);
      const input = { projectId: 'projectId', positionId: 'mock-pos-id', userId: 'some-userId' };
      const res = await service.removePositionFromProject({ ...input });

      expect(res).toBe(true);
      expect(mockRepo.removePositionFromProject).toHaveBeenCalledWith({ ...input });
    });
  });

  describe('changeProjectOwnership', () => {
    it('should change ownership of a project', async () => {
      mockRepo.changeProjectOwnership.mockResolvedValue(true);

      const input = { projectId: mockProject._id, fromUserId: mockProject.createdBy, toUserId: 'new-userId' };
      const res = await service.changeProjectOwnership({ ...input });

      expect(res).toEqual(true);
      expect(mockRepo.changeProjectOwnership).toHaveBeenCalledWith({ ...input });
    });
  });
});

import { makeUserService } from '../user';

const mockRepo = {
  handleLogin: jest.fn(),
  upsertUser: jest.fn(),
  getUserById: jest.fn(),
  getUsersByIds: jest.fn(),
  getUserByEmail: jest.fn(),
  getUsersByEmails: jest.fn()
};

const mockUser = {
  _id: 'mock-id',
  name: 'some-name',
  email: 'some-email'
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

const projectService = {
  getProjectById: jest.fn(),
  createProject: jest.fn(),
  updateProject: jest.fn()
};

describe('UserService', () => {
  // @ts-ignore
  const service = makeUserService({ userRepo: mockRepo, projectService });

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

  describe('#joinProject', () => {
    const input = { projectId: 'mock-projectId', userId: 'johndoe', positionId: 'mock-positionId' };

    it('should not join the project if the input is invalid', async () => {
      // @ts-ignore
      return expect(() => service.joinProject({ foo: 'bar' })).rejects.toThrow();
    });

    it('should not join the project if user does not exist', async () => {
      mockRepo.getUserById.mockResolvedValue(null);
      projectService.getProjectById.mockResolvedValue(mockProject);

      return expect(() => service.joinProject({ ...input })).rejects.toThrow();
    });

    it('should not join the project if it does not exist', async () => {
      mockRepo.getUserById.mockResolvedValue(mockUser);
      projectService.getProjectById.mockResolvedValue(null);

      return expect(() => service.joinProject({ ...input })).rejects.toThrow();
    });

    it('should handle an error', async () => {
      mockRepo.getUserById.mockResolvedValue(mockUser);
      projectService.getProjectById.mockRejectedValue(new Error('some error'));

      return expect(() => service.joinProject({ ...input })).rejects.toThrow();
    });

    it('should join the project', async () => {
      mockRepo.getUserById.mockResolvedValue(mockUser);
      projectService.getProjectById.mockResolvedValue(mockProject);

      const res = await service.joinProject({ ...input });

      expect(res).toEqual(true);
    });
  });

  describe('createProject', () => {
    it('should create a project', async () => {
      const input = {
        name: 'Project name',
        description: 'description',
        categories: ['mock-cat'],
        createdBy: 'blah'
      };

      projectService.createProject.mockResolvedValue({ ...mockProject });

      const res = await service.createProject({ ...input });

      expect(res).toEqual(mockProject);

      expect(projectService.createProject).toHaveBeenCalledWith({ ...input });
    });
  });

  describe('updateProject', () => {
    it('should update the project', async () => {
      projectService.updateProject.mockResolvedValue({ ...mockProject });

      const res = await projectService.updateProject({ ...mockProject, updatedBy: 'some-user' });

      expect(res).toEqual(mockProject);

      expect(projectService.updateProject).toHaveBeenCalledWith({ ...mockProject, updatedBy: 'some-user' });
    });
  });

  describe('#followProject', () => {
    const input = { projectId: 'mock-projectId', userId: 'johndoe' };

    it('should not follow the project if the input is invalid', async () => {
      // @ts-ignore
      return expect(() => service.followProject({ foo: 'bar' })).rejects.toThrow();
    });

    it('should not follow the project if user does not exist', async () => {
      mockRepo.getUserById.mockResolvedValue(null);
      projectService.getProjectById.mockResolvedValue(mockProject);

      return expect(() => service.followProject({ ...input })).rejects.toThrow();
    });

    it('should not follow the project if it does not exist', async () => {
      mockRepo.getUserById.mockResolvedValue(mockUser);
      projectService.getProjectById.mockResolvedValue(null);

      return expect(() => service.followProject({ ...input })).rejects.toThrow();
    });

    it('should handle an error', async () => {
      mockRepo.getUserById.mockResolvedValue(mockUser);
      projectService.getProjectById.mockRejectedValue(new Error('some error'));

      return expect(() => service.followProject({ ...input })).rejects.toThrow();
    });

    it('should follow the project', async () => {
      mockRepo.getUserById.mockResolvedValue(mockUser);
      projectService.getProjectById.mockResolvedValue(mockProject);

      const res = await service.followProject({ ...input });

      expect(res).toEqual(true);
    });
  });

  describe('#unfollowProject', () => {
    const input = { projectId: 'mock-projectId', userId: 'johndoe' };

    it('should not unfollow the project if the input is invalid', async () => {
      // @ts-ignore
      return expect(() => service.unfollowProject({ foo: 'bar' })).rejects.toThrow();
    });

    it('should not unfollow the project if user does not exist', async () => {
      mockRepo.getUserById.mockResolvedValue(null);
      projectService.getProjectById.mockResolvedValue(mockProject);

      return expect(() => service.unfollowProject({ ...input })).rejects.toThrow();
    });

    it('should not unfollow the project if it does not exist', async () => {
      mockRepo.getUserById.mockResolvedValue(mockUser);
      projectService.getProjectById.mockResolvedValue(null);

      return expect(() => service.unfollowProject({ ...input })).rejects.toThrow();
    });

    it('should handle an error', async () => {
      mockRepo.getUserById.mockResolvedValue(mockUser);
      projectService.getProjectById.mockRejectedValue(new Error('some error'));

      return expect(() => service.unfollowProject({ ...input })).rejects.toThrow();
    });

    it('should unfollow the project', async () => {
      mockRepo.getUserById.mockResolvedValue(mockUser);
      projectService.getProjectById.mockResolvedValue(mockProject);

      const res = await service.unfollowProject({ ...input });

      expect(res).toEqual(true);
    });
  });

  describe('#leaveProject', () => {
    const input = { projectId: 'mock-projectId', userId: 'johndoe' };

    it('should not leave the project if the input is invalid', async () => {
      // @ts-ignore
      return expect(() => service.leaveProject({ foo: 'bar' })).rejects.toThrow();
    });

    it('should not leave the project if user does not exist', async () => {
      mockRepo.getUserById.mockResolvedValue(null);
      projectService.getProjectById.mockResolvedValue(mockProject);

      return expect(() => service.leaveProject({ ...input })).rejects.toThrow();
    });

    it('should not leave the project if it does not exist', async () => {
      mockRepo.getUserById.mockResolvedValue(mockUser);
      projectService.getProjectById.mockResolvedValue(null);

      return expect(() => service.leaveProject({ ...input })).rejects.toThrow();
    });

    it('should not leave the project if the user is still the owner', async () => {
      mockRepo.getUserById.mockResolvedValue(mockUser);
      projectService.getProjectById.mockResolvedValue({ ...mockProject, createdBy: 'johndoe' });

      return expect(() => service.leaveProject({ ...input })).rejects.toThrow();
    });

    it('should handle an error', async () => {
      mockRepo.getUserById.mockResolvedValue(mockUser);
      projectService.getProjectById.mockRejectedValue(new Error('some error'));

      return expect(() => service.leaveProject({ ...input })).rejects.toThrow();
    });

    it('should leave the project', async () => {
      mockRepo.getUserById.mockResolvedValue(mockUser);
      projectService.getProjectById.mockResolvedValue(mockProject);

      const res = await service.leaveProject({ ...input });

      expect(res).toEqual(true);
    });
  });

  describe('#removeUserFromProject', () => {
    const input = { projectId: 'mock-projectId', positionId: 'mock-positionId', userId: 'random-userId', ownerId: 'johndoe' };

    it('should not remove user from the project if the input is invalid', async () => {
      // @ts-ignore
      return expect(() => service.removeUserFromProject({ foo: 'bar' })).rejects.toThrow();
    });

    it('should not remove the user if it does not exist', async () => {
      mockRepo.getUserById.mockResolvedValue(null);
      projectService.getProjectById.mockResolvedValue(mockProject);

      return expect(() => service.removeUserFromProject({ ...input })).rejects.toThrow();
    });

    it('should not remove user from the project if it does not exist', async () => {
      mockRepo.getUserById.mockResolvedValue(mockUser);
      projectService.getProjectById.mockResolvedValue(null);

      return expect(() => service.removeUserFromProject({ ...input })).rejects.toThrow();
    });

    it('should not remove user from the project if the user is still the owner', async () => {
      mockRepo.getUserById.mockResolvedValue(mockUser);
      projectService.getProjectById.mockResolvedValue({ ...mockProject, createdBy: 'johndoe' });

      return expect(() => service.removeUserFromProject({ ...input, userId: 'johndoe' })).rejects.toThrow();
    });

    it('should not remove user from the project if the user is not the owner', async () => {
      mockRepo.getUserById.mockResolvedValue(mockUser);
      projectService.getProjectById.mockResolvedValue({ ...mockProject, createdBy: 'user-blah' });

      return expect(() => service.removeUserFromProject({ ...input })).rejects.toThrow();
    });

    it('should handle an error', async () => {
      mockRepo.getUserById.mockResolvedValue(mockUser);
      projectService.getProjectById.mockRejectedValue(new Error('some error'));

      return expect(() => service.removeUserFromProject({ ...input })).rejects.toThrow();
    });

    it('should remove user from the project', async () => {
      mockRepo.getUserById.mockResolvedValue(mockUser);
      projectService.getProjectById.mockResolvedValue({ ...mockProject, createdBy: 'johndoe' });

      const res = await service.removeUserFromProject({ ...input });

      expect(res).toEqual(true);
    });
  });

  describe('#removePositionFromProject', () => {
    const input = { projectId: 'mock-projectId', positionId: 'mock-positionId', userId: 'random-userId' };

    it('should not remove position from the project if the input is invalid', async () => {
      // @ts-ignore
      return expect(() => service.removePositionFromProject({ foo: 'bar' })).rejects.toThrow();
    });

    it('should not remove position from the project if it does not exist', async () => {
      mockRepo.getUserById.mockResolvedValue(mockUser);
      projectService.getProjectById.mockResolvedValue(null);

      return expect(() => service.removePositionFromProject({ ...input })).rejects.toThrow();
    });

    it('should not remove position from the project if the user is not the owner', async () => {
      mockRepo.getUserById.mockResolvedValue(mockUser);
      projectService.getProjectById.mockResolvedValue({ ...mockProject, createdBy: 'user-blah' });

      return expect(() => service.removePositionFromProject({ ...input })).rejects.toThrow();
    });

    it('should not remove the position from the project if the owner is still the collaborator of that position', async () => {
      mockRepo.getUserById.mockResolvedValue(mockUser);
      projectService.getProjectById.mockResolvedValue({
        ...mockProject,
        createdBy: 'random-userId',
        collaborators: [
          {
            userId: 'random-userId',
            positionId: 'mock-positionId'
          }
        ]
      });

      return expect(() => service.removePositionFromProject({ ...input })).rejects.toThrow();
    });

    it('should handle an error', async () => {
      mockRepo.getUserById.mockResolvedValue(mockUser);
      projectService.getProjectById.mockRejectedValue(new Error('some error'));

      return expect(() => service.removePositionFromProject({ ...input })).rejects.toThrow();
    });

    it('should remove user from the project', async () => {
      mockRepo.getUserById.mockResolvedValue(mockUser);
      projectService.getProjectById.mockResolvedValue({
        ...mockProject,
        createdBy: 'random-userId',
        collaborators: [
          {
            userId: 'random-id',
            positionId: 'mock-positionId'
          }
        ]
      });
      const res = await service.removePositionFromProject({ ...input });

      expect(res).toEqual(true);
    });
  });

  describe('#changeProjectOwnership', () => {
    const input = { projectId: mockProject._id, fromUserId: 'some-user', toUserId: 'new-userid' };

    it('should not change the ownership of the project in the db if the input is invalid', () => {
      // @ts-ignore
      return expect(() => service.changeProjectOwnership({ foo: 'bar' })).rejects.toThrow();
    });

    it('should not change the ownership of the project in the db if it does not exist', () => {
      projectService.getProjectById.mockResolvedValue(null);
      return expect(() => service.changeProjectOwnership({ ...input })).rejects.toThrow('changeProjectOwnership error: project not found');
    });

    it('should not change the ownership of the project in the db if the user is not the project owner', () => {
      projectService.getProjectById.mockResolvedValue({ ...mockProject, createdBy: 'blah-id' });
      return expect(() => service.changeProjectOwnership({ ...input })).rejects.toThrow(
        'changeProjectOwnership error: user is not the project owner'
      );
    });

    it('should change the ownership of the project in the db', async () => {
      mockRepo.getUserById.mockResolvedValue(mockUser);
      projectService.getProjectById.mockResolvedValue(mockProject);
      projectService.updateProject.mockResolvedValue({ ...mockProject, createdBy: 'new-userid' });

      const res = await service.changeProjectOwnership({ ...input });

      expect(res).toEqual(true);

      expect(projectService.updateProject).toHaveBeenCalledWith({
        ...mockProject,
        isInternalUpdate: true,
        updatedBy: 'some-user',
        createdBy: 'new-userid'
      });
    });
  });
});

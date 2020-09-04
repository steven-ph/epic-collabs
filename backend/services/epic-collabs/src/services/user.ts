import { logger } from '@sp-tools/kloud-logger';
import { get, find, isEmpty, omit, values, uniq } from 'lodash';
import { IProjectService } from './project';
import { IProjectModel } from '../repositories/project';
import { newProjectValidationSchema, updateProjectValidationSchema } from '../models/project';
import {
  IUserRepository,
  IJoinProjectInput,
  IFollowProjectInput,
  IUnfollowProjectInput,
  ILeaveProjectInput,
  IRemoveUserFromProjectInput,
  IRemovePositionFromProjectInput,
  IChangeProjectOwnershipInput
} from '../repositories/user';
import {
  IUserModel,
  joinProjectValidationSchema,
  followProjectValidationSchema,
  unfollowProjectValidationSchema,
  leaveProjectValidationSchema,
  removeUserFromProjectValidationSchema,
  removePositionFromProjectValidationSchema,
  changeOwnershipValidationSchema
} from '../models/user';

interface IUpdateProfileInput extends IUserModel {
  updatedBy: string;
}

interface IUserService {
  handleLogin: (input: IUserModel) => Promise<IUserModel>;
  updateProfile: (input: IUpdateProfileInput) => Promise<IUserModel>;
  getUserById: (userId: string) => Promise<IUserModel>;
  getUsersByIds: (userIds: string[]) => Promise<IUserModel[]>;
  getUserByEmail: (email: string) => Promise<IUserModel>;
  getUsersByEmails: (emails: string[]) => Promise<IUserModel[]>;
  joinProject: (input: IJoinProjectInput) => Promise<boolean>;
  followProject: (input: IFollowProjectInput) => Promise<boolean>;
  unfollowProject: (input: IUnfollowProjectInput) => Promise<boolean>;
  leaveProject: (input: ILeaveProjectInput) => Promise<boolean>;
  removeUserFromProject: (input: IRemoveUserFromProjectInput) => Promise<boolean>;
  removePositionFromProject: (input: IRemovePositionFromProjectInput) => Promise<boolean>;
  changeProjectOwnership: (input: IChangeProjectOwnershipInput) => Promise<boolean>;
  createProject: (input: IProjectModel) => Promise<IProjectModel>;
  updateProject: (input: IProjectModel) => Promise<boolean>;
}

interface IUserServiceDI {
  userRepo: IUserRepository;
  projectService: IProjectService;
}

const makeUserService = ({ userRepo, projectService }: IUserServiceDI): IUserService => {
  const handleLogin = (input: IUserModel) => userRepo.handleLogin(input);
  const getUserById = (userId: string) => userRepo.getUserById(userId);
  const getUsersByIds = (userIds: string[]) => userRepo.getUsersByIds(userIds);
  const getUserByEmail = (email: string) => userRepo.getUserByEmail(email);
  const getUsersByEmails = (emails: string[]) => userRepo.getUsersByEmails(emails);

  const updateProfile = async (input: IUserModel) => {
    const _id = get(input, '_id');
    const updatedBy = get(input, 'updatedBy');

    if (isEmpty(_id) || isEmpty(updatedBy)) {
      const errMsg = 'updateProfile error: invalid userId';
      logger.error(errMsg, null, { input });

      throw new Error(errMsg);
    }

    if (_id !== updatedBy) {
      const errMsg = 'updateProfile error: not allowed to update other users profile';
      logger.error(errMsg, null, { input });

      throw new Error(errMsg);
    }

    const user = await userRepo.getUserById(_id);

    if (isEmpty(user)) {
      const errMsg = 'updateProfile error: user not found';
      logger.error(errMsg, null, { input });

      throw new Error(errMsg);
    }

    return userRepo.upsertUser({ ...omit(input, ['updatedBy']), email: user.email });
  };

  const joinProject = async (input: IJoinProjectInput) => {
    try {
      const validated = joinProjectValidationSchema.validate(input);

      if (validated.error) {
        logger.error('joinProject error', { error: validated.error.message }, { input });

        throw new Error(`joinProject error: ${validated.error.message}`);
      }

      const { userId, projectId, positionId } = input;

      const [user, project] = await Promise.all([userRepo.getUserById(userId), projectService.getProjectById(projectId)]);

      if (isEmpty(user) || isEmpty(project)) {
        const errMsg = 'joinProject error: user or project not found';
        logger.error(errMsg, null, { input });

        throw new Error(errMsg);
      }

      const contributingProjects = values(get(user, 'contributingProjects'));

      const collaborators = values(get(project, 'collaborators'));

      const editedCollaborators = collaborators.map(c =>
        c && c.positionId === positionId
          ? {
              positionId,
              userId
            }
          : c
      );

      await Promise.all([
        userRepo.upsertUser({ ...user, contributingProjects: uniq([projectId, ...contributingProjects]) }),
        updateProject({ ...project, collaborators: editedCollaborators, updatedBy: userId, isInternalUpdate: true })
      ]);

      return true;
    } catch (error) {
      logger.error('joinProject error', error, { input });
      throw error;
    }
  };

  const followProject = async (input: IFollowProjectInput) => {
    try {
      const validated = followProjectValidationSchema.validate(input);

      if (validated.error) {
        logger.error('followProject error', { error: validated.error.message }, { input });

        throw new Error(`followProject error: ${validated.error.message}`);
      }

      const { userId, projectId } = input;

      const [user, project] = await Promise.all([userRepo.getUserById(userId), projectService.getProjectById(projectId)]);

      if (isEmpty(user) || isEmpty(project)) {
        const errMsg = 'followProject error: user or project not found';
        logger.error(errMsg, null, { input });

        throw new Error(errMsg);
      }

      const followingProjects = values(get(user, 'followingProjects'));

      const followers = values(get(project, 'followers'));

      const userToUpdate = { ...user, followingProjects: uniq([projectId, ...followingProjects]) };

      await Promise.all([
        userRepo.upsertUser(userToUpdate),
        updateProject({
          ...project,
          followers: uniq([userId, ...followers]),
          updatedBy: userId,
          isInternalUpdate: true
        })
      ]);

      return true;
    } catch (error) {
      logger.error('followProject error', error, { input });

      throw error;
    }
  };

  const unfollowProject = async (input: IFollowProjectInput) => {
    try {
      const validated = unfollowProjectValidationSchema.validate(input);

      if (validated.error) {
        logger.error('unfollowProject error', { error: validated.error.message }, { input });

        throw new Error(`unfollowProject error: ${validated.error.message}`);
      }

      const { userId, projectId } = input;

      const [user, project] = await Promise.all([userRepo.getUserById(userId), projectService.getProjectById(projectId)]);

      if (isEmpty(user) || isEmpty(project)) {
        const errMsg = 'unfollowProject error: user or project not found';
        logger.error(errMsg, null, { input });

        throw new Error(errMsg);
      }

      const followingProjects = values(get(user, 'followingProjects'));
      const followers = values(get(project, 'followers'));

      await Promise.all([
        userRepo.upsertUser({ ...user, followingProjects: [...followingProjects.filter(p => p !== projectId)] }),
        updateProject({
          ...project,
          followers: [...followers.filter(f => f !== userId)],
          updatedBy: userId,
          isInternalUpdate: true
        })
      ]);

      return true;
    } catch (error) {
      logger.error('unfollowProject error', error, { input });
      throw error;
    }
  };

  const leaveProject = async (input: ILeaveProjectInput) => {
    try {
      const validated = leaveProjectValidationSchema.validate(input);

      if (validated.error) {
        logger.error('leaveProject error', { error: validated.error.message }, { input });

        throw new Error(`leaveProject error: ${validated.error.message}`);
      }

      const { projectId, userId } = input;

      const [user, project] = await Promise.all([userRepo.getUserById(userId), projectService.getProjectById(projectId)]);

      if (isEmpty(user) || isEmpty(project)) {
        const errMsg = 'joinProject error: user or project not found';
        logger.error(errMsg, null, { input });

        throw new Error(errMsg);
      }

      if (isEmpty(project)) {
        const errMsg = 'leaveProject error: project not found';
        logger.error(errMsg, null, { input });

        throw new Error(errMsg);
      }

      if (project.createdBy === userId) {
        const errMsg = 'leaveProject error: user is still the owner of the project';
        logger.error(errMsg, null, { input });

        throw new Error(errMsg);
      }

      const collaborators = values(get(project, 'collaborators'));

      const editedCollaborators = collaborators.map(c =>
        c && c.userId === userId
          ? {
              positionId: c.positionId,
              userId: null
            }
          : c
      );

      const contributingProjects = values(get(user, 'contributingProjects'));

      await Promise.all([
        userRepo.upsertUser({ ...user, contributingProjects: [...contributingProjects.filter(p => p !== projectId)] }),
        updateProject({ ...project, collaborators: editedCollaborators, updatedBy: userId, isInternalUpdate: true })
      ]);

      return true;
    } catch (error) {
      logger.error('leaveProject error', error, { input });
      throw error;
    }
  };

  const removeUserFromProject = async (input: IRemoveUserFromProjectInput) => {
    try {
      const validated = removeUserFromProjectValidationSchema.validate(input);

      if (validated.error) {
        logger.error('removeUserFromProject error', { error: validated.error.message }, { input });

        throw new Error(`removeUserFromProject error: ${validated.error.message}`);
      }

      const { ownerId, userId, projectId, positionId } = input;

      const [user, project] = await Promise.all([userRepo.getUserById(userId), projectService.getProjectById(projectId)]);

      if (isEmpty(user) || isEmpty(project)) {
        const errMsg = 'removeUserFromProject error: user or project not found';
        logger.error(errMsg, null, { input });

        throw new Error(errMsg);
      }

      if (project.createdBy === userId) {
        const errMsg = 'leaveProject error: user is still the owner of the project';
        logger.error(errMsg, null, { input });

        throw new Error(errMsg);
      }

      if (project.createdBy !== ownerId) {
        const errMsg = 'removeUserFromProject error: user is not the project owner';
        logger.error(errMsg, null, { input });

        throw new Error(errMsg);
      }

      const collaborators = values(get(project, 'collaborators'));

      const editedCollaborators = collaborators.map(c =>
        c && c.positionId === positionId
          ? {
              positionId,
              userId: null
            }
          : c
      );

      const contributingProjects = values(get(user, 'contributingProjects'));

      await Promise.all([
        userRepo.upsertUser({ ...user, contributingProjects: [...contributingProjects.filter(p => p !== projectId)] }),
        updateProject({ ...project, collaborators: editedCollaborators, updatedBy: userId, isInternalUpdate: true })
      ]);

      return true;
    } catch (error) {
      logger.error('removeUserFromProject error', error, { input });
      throw error;
    }
  };

  const removePositionFromProject = async (input: IRemovePositionFromProjectInput) => {
    try {
      const validated = removePositionFromProjectValidationSchema.validate(input);

      if (validated.error) {
        logger.error('removePositionFromProject error', { error: validated.error.message }, { input });

        throw new Error(`removePositionFromProject error: ${validated.error.message}`);
      }

      const { userId, projectId, positionId } = input;

      const project = await projectService.getProjectById(projectId);

      if (isEmpty(project)) {
        const errMsg = 'removePositionFromProject error: project not found';
        logger.error(errMsg, null, { input });

        throw new Error(errMsg);
      }

      if (project.createdBy !== userId) {
        const errMsg = 'removeUserFromProject error: user is not the project owner';
        logger.error(errMsg, null, { input });

        throw new Error(errMsg);
      }

      const collaborators = values(get(project, 'collaborators'));

      const collabUserId = get(find(collaborators, { positionId }), 'userId');

      if (collabUserId && project.createdBy === collabUserId) {
        const errMsg = 'removePositionFromProject error: user is still the owner of the project';
        logger.error(errMsg, null, { input });

        throw new Error(errMsg);
      }

      const editedCollaborators = collaborators.filter(c => c && c.positionId !== positionId);
      const updateProjectPromise = updateProject({
        ...project,
        collaborators: editedCollaborators,
        updatedBy: userId,
        isInternalUpdate: true
      });

      if (collabUserId) {
        const collabUser = await userRepo.getUserById(collabUserId);
        const contributingProjects = values(get(collabUser, 'contributingProjects'));

        await Promise.all([
          userRepo.upsertUser({ ...collabUser, contributingProjects: [...contributingProjects.filter(p => p !== projectId)] }),
          updateProjectPromise
        ]);

        return true;
      }

      await Promise.all([updateProjectPromise]);

      return true;
    } catch (error) {
      logger.error('removePositionFromProject error', error, { input });
      throw error;
    }
  };

  const changeProjectOwnership = async (input: IChangeProjectOwnershipInput) => {
    const validated = changeOwnershipValidationSchema.validate(input);

    if (validated.error) {
      logger.error('changeProjectOwnership error', { error: validated.error.message }, { input });

      throw new Error('changeProjectOwnership error:' + validated.error.message);
    }

    try {
      const { projectId, fromUserId, toUserId } = input;

      const [fromUser, toUser, existingProject] = await Promise.all([
        userRepo.getUserById(fromUserId),
        userRepo.getUserById(toUserId),
        projectService.getProjectById(projectId)
      ]);

      if (isEmpty(existingProject)) {
        const errMsg = 'changeProjectOwnership error: project not found';
        logger.error(errMsg, null, { input });

        throw new Error(errMsg);
      }

      if (existingProject.createdBy !== fromUserId) {
        const errMsg = 'changeProjectOwnership error: user is not the project owner';
        logger.error(errMsg, null, { input });

        throw new Error(errMsg);
      }

      const updateFromUserPromise = userRepo.upsertUser({
        ...fromUser,
        createdProjects: (fromUser.createdProjects || []).filter(p => p !== projectId)
      });

      const updateToUserPromise = userRepo.upsertUser({ ...toUser, createdProjects: uniq([projectId, ...(toUser.createdProjects || [])]) });

      const updateProjectPromise = updateProject({
        ...existingProject,
        createdBy: toUserId,
        updatedBy: fromUserId,
        isInternalUpdate: true
      });

      await Promise.all([updateFromUserPromise, updateToUserPromise, updateProjectPromise]);
      return true;
    } catch (error) {
      logger.error('changeProjectOwnership error', error, { input });

      throw error;
    }
  };

  const createProject = async (input: IProjectModel) => {
    const validated = newProjectValidationSchema.validate(input);

    if (validated.error) {
      logger.error('createProject error', { error: validated.error.message }, { input });

      throw new Error('createProject error: ' + validated.error.message);
    }

    try {
      const [user, created] = await Promise.all([userRepo.getUserById(input.createdBy), projectService.createProject(input)]);

      await userRepo.upsertUser({ ...user, createdProjects: uniq([`${created._id}`, ...(user.createdProjects || [])]) });

      return created;
    } catch (error) {
      logger.error('createProject error', error, { input });

      throw error;
    }
  };

  const updateProject = async (input: IProjectModel) => {
    const validated = updateProjectValidationSchema.validate(input);

    if (validated.error) {
      logger.error('updateProject error', { error: validated.error.message }, { input });

      throw new Error('updateProject error:' + validated.error.message);
    }

    try {
      await projectService.updateProject(input);

      return true;
    } catch (error) {
      logger.error('updateProject error', error, { input });

      throw error;
    }
  };

  return {
    handleLogin,
    updateProfile,
    getUserById,
    getUsersByIds,
    getUserByEmail,
    getUsersByEmails,
    joinProject,
    followProject,
    unfollowProject,
    leaveProject,
    createProject,
    updateProject,
    removeUserFromProject,
    removePositionFromProject,
    changeProjectOwnership
  };
};

export { makeUserService, IUserService, IUserModel, IUserServiceDI };

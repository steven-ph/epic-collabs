import Dataloader from 'dataloader';
import { logger } from '@sp-tools/kloud-logger';
import { get, find, isEmpty, values, uniq } from 'lodash';
import { makeLoader } from '../utils/dataloader';
import { IProjectService, IProjectModel } from '../services/project';
import { newProjectValidationSchema, updateProjectValidationSchema } from '../models/project';
import {
  IUserModel,
  upsertUserValidationSchema,
  joinProjectValidationSchema,
  followProjectValidationSchema,
  unfollowProjectValidationSchema,
  leaveProjectValidationSchema,
  removeUserFromProjectValidationSchema,
  removePositionFromProjectValidationSchema,
  changeOwnershipValidationSchema
} from '../models/user';

interface IJoinProjectInput {
  userId: string;
  projectId: string;
  positionId: string;
}

interface IFollowProjectInput {
  userId: string;
  projectId: string;
}

interface IUnfollowProjectInput {
  userId: string;
  projectId: string;
}

interface ILeaveProjectInput {
  userId: string;
  projectId: string;
}

interface IRemoveUserFromProjectInput {
  ownerId: string;
  userId: string;
  projectId: string;
  positionId: string;
}

interface IRemovePositionFromProjectInput {
  userId: string;
  projectId: string;
  positionId: string;
}

interface IChangeProjectOwnershipInput {
  projectId: string;
  fromUserId: string;
  toUserId: string;
}

interface IUserRepository {
  handleLogin: (input: IUserModel) => Promise<IUserModel>;
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

interface IUserRepositoryDI {
  userDb: any;
  projectService: IProjectService;
}

const updateOptions = { new: true, lean: true, upsert: true, omitUndefined: true };

const makeUserRepository = ({ userDb, projectService }: IUserRepositoryDI): IUserRepository => {
  const userByIdLoader = new Dataloader((userIds: string[]) => makeLoader({ db: userDb, key: '_id', ids: userIds }), {
    cacheKeyFn: key => JSON.stringify(key)
  });

  const userByEmailLoader = new Dataloader((emails: string[]) => makeLoader({ db: userDb, key: 'email', ids: emails }), {
    cacheKeyFn: key => JSON.stringify(key)
  });

  const handleLogin = async (input: IUserModel) => _upsertUser(input);

  const _upsertUser = async (input: IUserModel) => {
    const validated = upsertUserValidationSchema.validate(input);

    if (validated.error) {
      logger.error('upsertUser error', { error: validated.error.message }, { input });

      throw new Error('upsertUser error: ' + validated.error.message);
    }

    const _id = get(input, '_id');

    return userDb.findOneAndUpdate({ _id }, input, updateOptions);
  };

  const getUserById = async (id): Promise<IUserModel> => {
    if (!id) {
      return null;
    }

    return userByIdLoader.load(id);
  };

  const getUsersByIds = async (ids): Promise<IUserModel[]> => {
    if (!ids) {
      return null;
    }

    return userByIdLoader.loadMany(ids);
  };

  const getUserByEmail = async (email): Promise<IUserModel> => {
    if (!email) {
      return null;
    }

    return userByEmailLoader.load(email);
  };

  const getUsersByEmails = async (emails): Promise<IUserModel[]> => {
    if (!emails) {
      return null;
    }

    return userByEmailLoader.loadMany(emails);
  };

  const joinProject = async (input: IJoinProjectInput) => {
    try {
      const validated = joinProjectValidationSchema.validate(input);

      if (validated.error) {
        logger.error('joinProject error', { error: validated.error.message }, { input });

        return false;
      }

      const { userId, projectId, positionId } = input;

      const [user, project] = await Promise.all([getUserById(userId), projectService.getProjectById(projectId)]);

      if (isEmpty(user) || isEmpty(project)) {
        logger.error('joinProject error: user or project not found', null, { input });

        return false;
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
        _upsertUser({ ...user, contributingProjects: uniq([projectId, ...contributingProjects]) }),
        updateProject({ ...project, collaborators: editedCollaborators, updatedBy: userId, isInternalUpdate: true })
      ]);

      return true;
    } catch (error) {
      logger.error('joinProject error', error, { input });
      return false;
    }
  };

  const followProject = async (input: IFollowProjectInput) => {
    try {
      const validated = followProjectValidationSchema.validate(input);

      if (validated.error) {
        logger.error('followProject error', { error: validated.error.message }, { input });

        return false;
      }

      const { userId, projectId } = input;

      const [user, project] = await Promise.all([getUserById(userId), projectService.getProjectById(projectId)]);

      if (isEmpty(user) || isEmpty(project)) {
        logger.error('followProject error: user or project not found', null, { input });

        return false;
      }

      const followingProjects = values(get(user, 'followingProjects'));

      const followers = values(get(project, 'followers'));

      const userToUpdate = { ...user, followingProjects: uniq([projectId, ...followingProjects]) };

      await Promise.all([
        _upsertUser(userToUpdate),
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

      return false;
    }
  };

  const unfollowProject = async (input: IFollowProjectInput) => {
    try {
      const validated = unfollowProjectValidationSchema.validate(input);

      if (validated.error) {
        logger.error('unfollowProject error', { error: validated.error.message }, { input });

        return false;
      }

      const { userId, projectId } = input;

      const [user, project] = await Promise.all([getUserById(userId), projectService.getProjectById(projectId)]);

      if (isEmpty(user) || isEmpty(project)) {
        logger.error('unfollowProject error: user or project not found', null, { input });

        return false;
      }

      const followingProjects = values(get(user, 'followingProjects'));
      const followers = values(get(project, 'followers'));

      await Promise.all([
        _upsertUser({ ...user, followingProjects: [...followingProjects.filter(p => p !== projectId)] }),
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
      return false;
    }
  };

  const leaveProject = async (input: ILeaveProjectInput) => {
    try {
      const validated = leaveProjectValidationSchema.validate(input);

      if (validated.error) {
        logger.error('leaveProject error', { error: validated.error.message }, { input });

        return false;
      }

      const { projectId, userId } = input;

      const [user, project] = await Promise.all([getUserById(userId), projectService.getProjectById(projectId)]);

      if (isEmpty(user) || isEmpty(project)) {
        logger.error('joinProject error: user or project not found', null, { input });

        return false;
      }

      if (isEmpty(project)) {
        const errMsg = 'leaveProject error: project not found';
        logger.error(errMsg, null, { input });

        return false;
      }

      if (project.createdBy === userId) {
        const errMsg = 'leaveProject error: user is still the owner of the project';
        logger.error(errMsg, null, { input });

        return false;
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
        _upsertUser({ ...user, contributingProjects: [...contributingProjects.filter(p => p !== projectId)] }),
        updateProject({ ...project, collaborators: editedCollaborators, updatedBy: userId, isInternalUpdate: true })
      ]);

      return true;
    } catch (error) {
      logger.error('leaveProject error', error, { input });
      return false;
    }
  };

  const removeUserFromProject = async (input: IRemoveUserFromProjectInput) => {
    try {
      const validated = removeUserFromProjectValidationSchema.validate(input);

      if (validated.error) {
        logger.error('removeUserFromProject error', { error: validated.error.message }, { input });

        return false;
      }

      const { ownerId, userId, projectId, positionId } = input;

      const [user, project] = await Promise.all([getUserById(userId), projectService.getProjectById(projectId)]);

      if (isEmpty(user) || isEmpty(project)) {
        logger.error('removeUserFromProject error: user or project not found', null, { input });

        return false;
      }

      if (project.createdBy === userId) {
        const errMsg = 'leaveProject error: user is still the owner of the project';
        logger.error(errMsg, null, { input });

        return false;
      }

      if (project.createdBy !== ownerId) {
        logger.error('removeUserFromProject error: user is not the project owner', null, { input });

        return false;
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
        _upsertUser({ ...user, contributingProjects: [...contributingProjects.filter(p => p !== projectId)] }),
        updateProject({ ...project, collaborators: editedCollaborators, updatedBy: userId, isInternalUpdate: true })
      ]);

      return true;
    } catch (error) {
      logger.error('removeUserFromProject error', error, { input });
      return false;
    }
  };

  const removePositionFromProject = async (input: IRemovePositionFromProjectInput) => {
    try {
      const validated = removePositionFromProjectValidationSchema.validate(input);

      if (validated.error) {
        logger.error('removePositionFromProject error', { error: validated.error.message }, { input });

        return false;
      }

      const { userId, projectId, positionId } = input;

      const project = await projectService.getProjectById(projectId);

      if (isEmpty(project)) {
        logger.error('removePositionFromProject error: project not found', null, { input });

        return false;
      }

      if (project.createdBy !== userId) {
        logger.error('removeUserFromProject error: user is not the project owner', null, { input });

        return false;
      }

      const collaborators = values(get(project, 'collaborators'));

      const collabUserId = get(find(collaborators, { positionId }), 'userId');

      if (collabUserId && project.createdBy === collabUserId) {
        const errMsg = 'removePositionFromProject error: user is still the owner of the project';
        logger.error(errMsg, null, { input });

        return false;
      }

      const editedCollaborators = collaborators.filter(c => c && c.positionId !== positionId);
      const updateProjectPromise = updateProject({
        ...project,
        collaborators: editedCollaborators,
        updatedBy: userId,
        isInternalUpdate: true
      });

      if (collabUserId) {
        const collabUser = await getUserById(collabUserId);
        const contributingProjects = values(get(collabUser, 'contributingProjects'));

        await Promise.all([
          _upsertUser({ ...collabUser, contributingProjects: [...contributingProjects.filter(p => p !== projectId)] }),
          updateProjectPromise
        ]);

        return true;
      }

      await Promise.all([updateProjectPromise]);

      return true;
    } catch (error) {
      logger.error('removePositionFromProject error', error, { input });
      return false;
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
        getUserById(fromUserId),
        getUserById(toUserId),
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

      const updateFromUserPromise = _upsertUser({ ...fromUser, createdProjects: (fromUser.createdProjects || []).filter(p => p !== projectId) });

      const updateToUserPromise = _upsertUser({ ...toUser, createdProjects: uniq([projectId, ...(toUser.createdProjects || [])]) });

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
      const [user, created] = await Promise.all([getUserById(input.createdBy), projectService.createProject(input)]);

      await _upsertUser({ ...user, createdProjects: uniq([`${created._id}`, ...(user.createdProjects || [])]) });

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
    getUserById,
    getUsersByIds,
    getUserByEmail,
    getUsersByEmails,
    joinProject,
    followProject,
    unfollowProject,
    leaveProject,
    removeUserFromProject,
    removePositionFromProject,
    changeProjectOwnership,
    createProject,
    updateProject
  };
};

export {
  makeUserRepository,
  IUserRepositoryDI,
  IUserRepository,
  IUserModel,
  IJoinProjectInput,
  IFollowProjectInput,
  IUnfollowProjectInput,
  ILeaveProjectInput,
  IRemoveUserFromProjectInput,
  IRemovePositionFromProjectInput,
  IChangeProjectOwnershipInput
};

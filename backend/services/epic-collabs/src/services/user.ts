import {
  IUserRepository,
  IUserModel,
  IJoinProjectInput,
  IFollowProjectInput,
  IUnfollowProjectInput,
  ILeaveProjectInput,
  IRemoveUserFromProjectInput,
  IRemovePositionFromProjectInput,
  IChangeProjectOwnershipInput,
  IUserRepositoryDI
} from '../repositories/user';
import { IProjectModel } from '../repositories/project';

interface IUserService {
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

interface IUserServiceDI {
  userRepo: IUserRepository;
}

const makeUserService = ({ userRepo }: IUserServiceDI): IUserService => {
  const handleLogin = (input: IUserModel) => userRepo.handleLogin(input);
  const getUserById = (userId: string) => userRepo.getUserById(userId);
  const getUsersByIds = (userIds: string[]) => userRepo.getUsersByIds(userIds);
  const getUserByEmail = (email: string) => userRepo.getUserByEmail(email);
  const getUsersByEmails = (emails: string[]) => userRepo.getUsersByEmails(emails);
  const joinProject = (input: IJoinProjectInput) => userRepo.joinProject(input);
  const followProject = (input: IFollowProjectInput) => userRepo.followProject(input);
  const unfollowProject = (input: IUnfollowProjectInput) => userRepo.unfollowProject(input);
  const leaveProject = (input: ILeaveProjectInput) => userRepo.leaveProject(input);
  const removeUserFromProject = (input: IRemoveUserFromProjectInput) => userRepo.removeUserFromProject(input);
  const removePositionFromProject = (input: IRemovePositionFromProjectInput) => userRepo.removePositionFromProject(input);
  const changeProjectOwnership = (input: IChangeProjectOwnershipInput) => userRepo.changeProjectOwnership(input);
  const createProject = (input: IProjectModel) => userRepo.createProject(input);
  const updateProject = (input: IProjectModel) => userRepo.updateProject(input);

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
    createProject,
    updateProject,
    removeUserFromProject,
    removePositionFromProject,
    changeProjectOwnership
  };
};

export { makeUserService, IUserService, IUserModel, IUserRepositoryDI };

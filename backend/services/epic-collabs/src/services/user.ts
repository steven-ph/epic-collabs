import {
  IUserRepository,
  IUserModel,
  IJoinProjectInput,
  IFollowProjectInput,
  IUnfollowProjectInput,
  ILeaveProjectInput,
  IUserRepositoryDI
} from '../repositories/user';

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

  return {
    handleLogin,
    getUserById,
    getUsersByIds,
    getUserByEmail,
    getUsersByEmails,
    joinProject,
    followProject,
    unfollowProject,
    leaveProject
  };
};

export { makeUserService, IUserService, IUserModel, IUserRepositoryDI };

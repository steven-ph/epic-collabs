import { IUserRepository, IUserModel } from '../repositories/user';

interface IUserService {
  handleLogin: (input: IUserModel) => Promise<IUserModel>;
  getUserById: (userId: string) => Promise<IUserModel>;
  getUsersByIds: (userIds: string[]) => Promise<IUserModel[]>;
  getUserByEmail: (email: string) => Promise<IUserModel>;
  getUsersByEmails: (emails: string[]) => Promise<IUserModel[]>;
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

  return {
    handleLogin,
    getUserById,
    getUsersByIds,
    getUserByEmail,
    getUsersByEmails
  };
};

export { makeUserService, IUserService, IUserModel };

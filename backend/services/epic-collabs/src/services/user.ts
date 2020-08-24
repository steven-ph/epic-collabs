import { IUserRepository, IUserInfo } from '../repositories/user';

interface IUserService {
  login: (input: IUserInfo) => Promise<IUserInfo | null>;
  getUserById: (userId: string) => Promise<IUserInfo | null>;
  getUsersByIds: (userIds: string[]) => Promise<IUserInfo[]>;
  getUserByEmail: (email: string) => Promise<IUserInfo | null>;
  getUsersByEmails: (emails: string[]) => Promise<IUserInfo[]>;
}

interface IUserServiceDI {
  userRepo: IUserRepository;
}

const makeUserService = ({ userRepo }: IUserServiceDI): IUserService => {
  const login = (input: IUserInfo) => userRepo.login(input);
  const getUserById = (userId: string) => userRepo.getUserById(userId);
  const getUsersByIds = (userIds: string[]) => userRepo.getUsersByIds(userIds);
  const getUserByEmail = (email: string) => userRepo.getUserByEmail(email);
  const getUsersByEmails = (emails: string[]) => userRepo.getUsersByEmails(emails);

  return {
    login,
    getUserById,
    getUsersByIds,
    getUserByEmail,
    getUsersByEmails
  };
};

export { makeUserService, IUserService, IUserInfo };

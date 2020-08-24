import { IUserRepository, IUserModel } from '../repositories/user';

interface IUserService {
  login: (input: IUserModel) => Promise<IUserModel | null>;
  getUserById: (userId: string) => Promise<IUserModel | null>;
  getUsersByIds: (userIds: string[]) => Promise<IUserModel[]>;
  getUserByEmail: (email: string) => Promise<IUserModel | null>;
  getUsersByEmails: (emails: string[]) => Promise<IUserModel[]>;
}

interface IUserServiceDI {
  userRepo: IUserRepository;
}

const makeUserService = ({ userRepo }: IUserServiceDI): IUserService => {
  const login = (input: IUserModel) => userRepo.login(input);
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

export { makeUserService, IUserService, IUserModel };

import { IUserRepository, IUserInfo } from 'repositories/user';

interface IUserService {
  login: (input: IUserInfo) => Promise<IUserInfo | null>;
  getUserById: (userId: string) => Promise<IUserInfo | null>;
  getUserByEmail: (email: string) => Promise<IUserInfo | null>;
}

interface IUserServiceDI {
  userRepo: IUserRepository;
}

const makeUserService = ({ userRepo }: IUserServiceDI): IUserService => {
  const login = (input: IUserInfo) => userRepo.login(input);
  const getUserById = (userId: string) => userRepo.getUserById(userId);
  const getUserByEmail = (email: string) => userRepo.getUserByEmail(email);

  return {
    login,
    getUserById,
    getUserByEmail
  };
};

export { makeUserService, IUserService, IUserInfo };

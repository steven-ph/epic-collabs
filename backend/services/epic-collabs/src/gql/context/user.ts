import { makeUserRepository } from '../../repositories/user';
import { makeUserService, IUserService, IUserRepositoryDI } from '../../services/user';

const makeUserContext = ({ userDb, projectService }: IUserRepositoryDI): IUserService => {
  const userRepo = makeUserRepository({ userDb, projectService });

  return makeUserService({ userRepo });
};

export { makeUserContext, IUserService };

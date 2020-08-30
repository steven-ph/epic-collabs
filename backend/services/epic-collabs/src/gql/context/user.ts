import { makeUserRepository } from '../../repositories/user';
import { makeUserService, IUserService } from '../../services/user';

const makeUserContext = ({ userDb, projectService }): IUserService => {
  const userRepo = makeUserRepository({ userDb });

  return makeUserService({ userRepo, projectService });
};

export { makeUserContext, IUserService };

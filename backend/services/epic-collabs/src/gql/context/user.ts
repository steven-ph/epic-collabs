import { makeUserRepository } from '../../repositories/user';
import { makeUserService, IUserService } from '../../services/user';

const makeUserContext = ({ userDb }): IUserService => {
  const userRepo = makeUserRepository({ userDb });

  return makeUserService({ userRepo });
};

export { makeUserContext, IUserService };

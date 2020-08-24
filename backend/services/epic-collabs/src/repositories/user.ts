import Dataloader from 'dataloader';
import { isEmpty, get } from 'lodash';
import { IUserInfo } from '../models/user';
import { loader } from '../utils/dataloader';

interface IUserRepository {
  login: (input: IUserInfo) => Promise<IUserInfo | null>;
  upsertUser: (input: IUserInfo) => Promise<IUserInfo | null>;
  getUserById: (userId: string) => Promise<IUserInfo | null>;
  getUsersByIds: (userIds: string[]) => Promise<IUserInfo[]>;
  getUserByEmail: (email: string) => Promise<IUserInfo | null>;
  getUsersByEmails: (emails: string[]) => Promise<IUserInfo[]>;
}

const makeUserRepository = ({ userDb }): IUserRepository => {
  const userByIdLoader = new Dataloader((userIds: string[]) => loader({ db: userDb, key: 'userId', ids: userIds }), {
    cacheKeyFn: key => JSON.stringify(key)
  });

  const userByEmailLoader = new Dataloader((emails: string[]) => loader({ db: userDb, key: 'email', ids: emails }), {
    cacheKeyFn: key => JSON.stringify(key)
  });

  const login = async (input: IUserInfo) => upsertUser(input);

  const upsertUser = async (input: IUserInfo) => {
    const userId = get(input, 'userId');

    if (isEmpty(userId)) {
      return null;
    }

    const options = { new: true, upsert: true, omitUndefined: true };

    return userDb.findOneAndUpdate({ userId: input.userId }, input, options);
  };

  const getUserById = async userId => userByIdLoader.load(userId);

  const getUsersByIds = async userIds => userByIdLoader.loadMany(userIds);

  const getUserByEmail = async email => userByEmailLoader.load(email);

  const getUsersByEmails = async emails => userByEmailLoader.loadMany(emails);

  return {
    login,
    upsertUser,
    getUserById,
    getUsersByIds,
    getUserByEmail,
    getUsersByEmails
  };
};

export { makeUserRepository, IUserRepository, IUserInfo };

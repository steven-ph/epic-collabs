import Dataloader from 'dataloader';
import { isEmpty, get } from 'lodash';
import { IUserModel } from '../models/user';
import { loader } from '../utils/dataloader';

interface IUserRepository {
  login: (input: IUserModel) => Promise<IUserModel | null>;
  upsertUser: (input: IUserModel) => Promise<IUserModel | null>;
  getUserById: (userId: string) => Promise<IUserModel | null>;
  getUsersByIds: (userIds: string[]) => Promise<IUserModel[]>;
  getUserByEmail: (email: string) => Promise<IUserModel | null>;
  getUsersByEmails: (emails: string[]) => Promise<IUserModel[]>;
}

const makeUserRepository = ({ userDb }): IUserRepository => {
  const userByIdLoader = new Dataloader((userIds: string[]) => loader({ db: userDb, key: '_id', ids: userIds }), {
    cacheKeyFn: key => JSON.stringify(key)
  });

  const userByEmailLoader = new Dataloader((emails: string[]) => loader({ db: userDb, key: 'email', ids: emails }), {
    cacheKeyFn: key => JSON.stringify(key)
  });

  const login = async (input: IUserModel) => upsertUser(input);

  const upsertUser = async (input: IUserModel) => {
    const _id = get(input, '_id');

    if (isEmpty(_id)) {
      return null;
    }

    const options = { new: true, upsert: true, omitUndefined: true };

    return userDb.findOneAndUpdate({ _id }, input, options);
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

export { makeUserRepository, IUserRepository, IUserModel };

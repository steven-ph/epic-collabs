import Dataloader from 'dataloader';
import { find, isEmpty, map, reduce } from 'lodash';
import { IUserInfo } from '../models/user';

interface IUserRepository {
  login: (input: IUserInfo) => Promise<IUserInfo | null>;
  createUser: (input: IUserInfo) => Promise<IUserInfo | null>;
  getUserById: (userId: string) => Promise<IUserInfo | null>;
  getUsersByIds: (userIds: string[]) => Promise<any[]>;
  getUserByEmail: (email: string) => Promise<IUserInfo | null>;
  getUsersByEmails: (emails: string[]) => Promise<any[]>;
}

interface IFindManyByKeyInput {
  key: string;
  values: string[];
}

const makeUserRepository = ({ userDb }): IUserRepository => {
  const _implementFindMany = async ({ key, values }: IFindManyByKeyInput): Promise<any[]> => {
    return userDb.find().where(key).in(values).exec();
  };

  const _implementUserByIdLoader = async userIds => {
    const users = await _implementFindMany({ key: 'userId', values: userIds });

    const usersMap = reduce(
      userIds,
      (obj, userId) => {
        obj[userId] = find(users, { userId });
        return obj;
      },
      {}
    );

    return map(userIds, userId => usersMap[userId] || null);
  };

  const _implementUserByEmailLoader = async emails => {
    const users = await _implementFindMany({ key: 'email', values: emails });

    const usersMap = reduce(
      emails,
      (obj, email) => {
        obj[email] = find(users, { email });
        return obj;
      },
      {}
    );

    return map(emails, email => usersMap[email] || null);
  };

  const userByIdLoader = new Dataloader(userIds => _implementUserByIdLoader(userIds), { cacheKeyFn: key => JSON.stringify(key) });
  const userByEmailLoader = new Dataloader(userIds => _implementUserByEmailLoader(userIds), { cacheKeyFn: key => JSON.stringify(key) });

  const login = async (input: IUserInfo) => {
    const { email } = input;

    if (isEmpty(email)) {
      return null;
    }

    const foundUser = await userByEmailLoader.load(email);

    if (!isEmpty(foundUser)) {
      return null;
    }

    return createUser(input);
  };

  const createUser = async (input: IUserInfo) => userDb.create(input);

  const getUserById = async userId => userByIdLoader.load(userId);

  const getUsersByIds = async userIds => userByIdLoader.loadMany(userIds);

  const getUserByEmail = async email => userByEmailLoader.load(email);

  const getUsersByEmails = async emails => userByEmailLoader.loadMany(emails);

  return {
    login,
    createUser,
    getUserById,
    getUsersByIds,
    getUserByEmail,
    getUsersByEmails
  };
};

export { makeUserRepository, IUserRepository, IUserInfo };

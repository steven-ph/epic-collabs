import Dataloader from 'dataloader';
import { find, isEmpty, map, reduce } from 'lodash';
import { IUserInfo } from 'models/user';

interface IUserRepository {
  login: (input: IUserInfo) => Promise<IUserInfo | null>;
  upsertUser: (input: IUserInfo) => Promise<IUserInfo | null>;
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
  const _buildUserDataMap = ({ key, values, users }) => {
    return reduce(
      values,
      (obj, val) => {
        obj[val] = find(users, { [key]: val });
        return obj;
      },
      {}
    );
  };

  const _implementFindMany = async ({ key, values }: IFindManyByKeyInput): Promise<any[]> => {
    return userDb.find().where(key).in(values).exec();
  };

  const _implementUserByIdLoader = async userIds => {
    const key = 'userId';
    const values = userIds;

    const users = await _implementFindMany({ key, values });

    const usersMap = _buildUserDataMap({ key, values, users });

    return map(userIds, userId => usersMap[userId] || null);
  };

  const _implementUserByEmailLoader = async emails => {
    const key = 'email';
    const values = emails;

    const users = await _implementFindMany({ key, values });

    const usersMap = _buildUserDataMap({ key, values, users });

    return map(emails, email => usersMap[email] || null);
  };

  const userByIdLoader = new Dataloader(userIds => _implementUserByIdLoader(userIds), { cacheKeyFn: key => JSON.stringify(key) });
  const userByEmailLoader = new Dataloader(userIds => _implementUserByEmailLoader(userIds), { cacheKeyFn: key => JSON.stringify(key) });

  const login = async (input: IUserInfo) => {
    const { userId } = input;

    if (isEmpty(userId)) {
      return null;
    }

    return upsertUser(input);
  };

  const upsertUser = async (input: IUserInfo) => {
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

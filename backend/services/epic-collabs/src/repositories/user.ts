import Dataloader from 'dataloader';
import { get } from 'lodash';
import { logger } from '@sp-tools/kloud-logger';
import { makeLoader } from '../utils/dataloader';
import { IUserModel, upsertUserValidationSchema } from '../models/user';

interface IUserRepository {
  handleLogin: (input: IUserModel) => Promise<IUserModel>;
  getUserById: (userId: string) => Promise<IUserModel>;
  getUsersByIds: (userIds: string[]) => Promise<IUserModel[]>;
  getUserByEmail: (email: string) => Promise<IUserModel>;
  getUsersByEmails: (emails: string[]) => Promise<IUserModel[]>;
}

const makeUserRepository = ({ userDb }): IUserRepository => {
  const userByIdLoader = new Dataloader((userIds: string[]) => makeLoader({ db: userDb, key: '_id', ids: userIds }), {
    cacheKeyFn: key => JSON.stringify(key)
  });

  const userByEmailLoader = new Dataloader((emails: string[]) => makeLoader({ db: userDb, key: 'email', ids: emails }), {
    cacheKeyFn: key => JSON.stringify(key)
  });

  const handleLogin = async (input: IUserModel) => _upsertUser(input);

  const _upsertUser = async (input: IUserModel) => {
    const validated = upsertUserValidationSchema.validate(input);

    if (validated.error) {
      logger.error('upsertUser error', validated.error, { input });

      throw new Error('upsertUser error: ' + validated.error.message);
    }

    const _id = get(input, '_id');

    const options = { new: true, upsert: true, omitUndefined: true };

    return userDb.findOneAndUpdate({ _id }, input, options);
  };

  const getUserById = async id => userByIdLoader.load(`${id}`);

  const getUsersByIds = async ids => userByIdLoader.loadMany(ids.map(id => `${id}`));

  const getUserByEmail = async email => userByEmailLoader.load(`${email}`);

  const getUsersByEmails = async emails => userByEmailLoader.loadMany(emails.map(email => `${email}`));

  return {
    handleLogin,
    getUserById,
    getUsersByIds,
    getUserByEmail,
    getUsersByEmails
  };
};

export { makeUserRepository, IUserRepository, IUserModel };

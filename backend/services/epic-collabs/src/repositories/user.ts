import Dataloader from 'dataloader';
import { logger } from '@sp-tools/kloud-logger';
import { get } from 'lodash';
import { makeLoader } from '../utils/dataloader';
import { IUserModel, upsertUserValidationSchema } from '../models/user';

interface IJoinProjectInput {
  userId: string;
  projectId: string;
  positionId: string;
}

interface IFollowProjectInput {
  userId: string;
  projectId: string;
}

interface IUnfollowProjectInput {
  userId: string;
  projectId: string;
}

interface ILeaveProjectInput {
  userId: string;
  projectId: string;
}

interface IRemoveUserFromProjectInput {
  ownerId: string;
  userId: string;
  projectId: string;
  positionId: string;
}

interface IRemovePositionFromProjectInput {
  userId: string;
  projectId: string;
  positionId: string;
}

interface IChangeProjectOwnershipInput {
  projectId: string;
  fromUserId: string;
  toUserId: string;
}

interface IUserRepository {
  handleLogin: (input: IUserModel) => Promise<IUserModel>;
  upsertUser: (input: IUserModel) => Promise<IUserModel>;
  getUserById: (userId: string) => Promise<IUserModel>;
  getUsersByIds: (userIds: string[]) => Promise<IUserModel[]>;
  getUserByEmail: (email: string) => Promise<IUserModel>;
  getUsersByEmails: (emails: string[]) => Promise<IUserModel[]>;
}

interface IUserRepositoryDI {
  userDb: any;
}

const updateOptions = { new: true, lean: true, upsert: true, omitUndefined: true };

const makeUserRepository = ({ userDb }: IUserRepositoryDI): IUserRepository => {
  const userByIdLoader = new Dataloader((userIds: string[]) => makeLoader({ db: userDb, key: '_id', ids: userIds }), {
    cacheKeyFn: key => JSON.stringify(key)
  });

  const userByEmailLoader = new Dataloader((emails: string[]) => makeLoader({ db: userDb, key: 'email', ids: emails }), {
    cacheKeyFn: key => JSON.stringify(key)
  });

  const invalidateCache = ({ id, email }) => {
    if (id) {
      userByIdLoader.clear(id);
    }

    if (email) {
      userByEmailLoader.clear(email);
    }
  };

  const handleLogin = async (input: IUserModel) => upsertUser(input);

  const upsertUser = async (input: IUserModel) => {
    const validated = upsertUserValidationSchema.validate(input);

    if (validated.error) {
      logger.error('upsertUser error', { error: validated.error.message }, { input });

      throw new Error('upsertUser error: ' + validated.error.message);
    }

    const id = get(input, '_id');
    const email = get(input, 'email');

    invalidateCache({ id, email });

    return userDb.findOneAndUpdate({ _id: id }, input, updateOptions);
  };

  const getUserById = async (id): Promise<IUserModel> => {
    if (!id) {
      return null;
    }

    return userByIdLoader.load(id);
  };

  const getUsersByIds = async (ids): Promise<IUserModel[]> => {
    if (!ids) {
      return null;
    }

    return userByIdLoader.loadMany(ids);
  };

  const getUserByEmail = async (email): Promise<IUserModel> => {
    if (!email) {
      return null;
    }

    return userByEmailLoader.load(email);
  };

  const getUsersByEmails = async (emails): Promise<IUserModel[]> => {
    if (!emails) {
      return null;
    }

    return userByEmailLoader.loadMany(emails);
  };

  return {
    handleLogin,
    upsertUser,
    getUserById,
    getUsersByIds,
    getUserByEmail,
    getUsersByEmails
  };
};

export {
  makeUserRepository,
  IUserRepositoryDI,
  IUserRepository,
  IUserModel,
  IJoinProjectInput,
  IFollowProjectInput,
  IUnfollowProjectInput,
  ILeaveProjectInput,
  IRemoveUserFromProjectInput,
  IRemovePositionFromProjectInput,
  IChangeProjectOwnershipInput
};

import { logger } from '@sp-tools/kloud-logger';
import { get, omitBy, isNil, isEmpty } from 'lodash';
import { IUserModel } from '../../models/user';
import { getParameters } from '../../utils/get-parameters';
import { makeUserContext } from '../../gql/context/user';
import { generateAvatar } from '../../utils/random-image';
import { makeMongoDbConnection } from '../../libs/make-mongodb-connection';

const handler = async event => {
  try {
    const eventBody = JSON.parse(event.body);
    const auth0User = get(eventBody, 'data.profile');
    const _id = get(auth0User, 'user_id');
    const createdAt = get(auth0User, 'created_at');

    const user: IUserModel = omitBy(
      {
        _id,
        email: get(auth0User, 'email'),
        picture: get(auth0User, 'picture') || generateAvatar(),
        username: get(auth0User, 'username') || get(auth0User, 'email'),
        name: get(auth0User, 'name'),
        bio: '',
        firstName: get(auth0User, 'given_name'),
        lastName: get(auth0User, 'family_name'),
        createdAt: createdAt ? new Date(`${createdAt}`).getTime() : Date.now(),
        emailVerified: !!get(auth0User, 'email_verified'),
        createdProjects: [],
        followingProjects: [],
        contributingProjects: []
      },
      isNil
    );

    if (isNil(_id) || isEmpty(user)) {
      logger.warn('Handle auth0 login warning: No user info', null, { eventBody });

      return { statusCode: 200 };
    }

    const { MONGO_DB_URL } = await getParameters();

    const dbConnection = await makeMongoDbConnection(MONGO_DB_URL);

    // @ts-ignore
    const userService = makeUserContext({ userDb: dbConnection.models.User });

    await userService.handleLogin(user);

    return { statusCode: 200 };
  } catch (error) {
    logger.error('Handle auth0 login error', error, { event });
    return { statusCode: 200 };
  }
};

export { handler };

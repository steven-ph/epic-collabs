import { logger } from '@sp-tools/kloud-logger';
import { get, omitBy, isNil, isEmpty } from 'lodash';
import { IUserInfo } from '../../models/user';
import { getParameters } from '../../utils/get-parameters';
import { makeUserContext } from '../../graphql/context/user';
import { makeMongoDbConnection } from '../../libs/make-mongodb-connection';

const handler = async event => {
  try {
    const eventBody = JSON.parse(event.body);
    const auth0User = get(eventBody, 'data.profile');
    const userId = get(auth0User, 'user_id');

    const user: IUserInfo = omitBy(
      {
        userId,
        email: get(auth0User, 'email'),
        picture: get(auth0User, 'picture'),
        username: get(auth0User, 'username') || get(auth0User, 'email'),
        name: get(auth0User, 'name'),
        firstName: get(auth0User, 'given_name'),
        lastName: get(auth0User, 'family_name')
      },
      isNil
    );

    if (isNil(userId) || isEmpty(user)) {
      logger.warn('Handle auth0 login warning: No user info', null, { eventBody });

      return { statusCode: 200 };
    }

    const { MONGO_DB_URL } = await getParameters();

    const dbConnection = await makeMongoDbConnection(MONGO_DB_URL);

    const userService = makeUserContext({ userDb: dbConnection.models.User });

    return userService.login(user);
  } catch (error) {
    logger.warn('Handle auth0 login error', error, { event });
    return { statusCode: 200 };
  }
};

export { handler };

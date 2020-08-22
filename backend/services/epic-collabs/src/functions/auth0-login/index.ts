import { get } from 'lodash';
import { logger } from '../../utils/logger';
import { IUserInfo } from '../../models/user';
import { getParameters } from '../../utils/get-parameters';
import { makeUserContext } from '../../graphql/context/user';
import { makeMongoDbConnection } from '../../libs/make-mongodb-connection';

const handler = async event => {
  try {
    const { data } = JSON.parse(event.body);
    const auth0User = get(data, 'user');

    const user: IUserInfo = {
      email: auth0User.email,
      userId: auth0User.user_id,
      picture: auth0User.picture,
      username: auth0User.nickname,
      firstName: auth0User.given_name,
      lastName: auth0User.family_name
    };

    const { MONGO_DB_URL } = await getParameters();

    const dbConnection = await makeMongoDbConnection(MONGO_DB_URL);

    const userService = makeUserContext({ userDb: dbConnection.models.User });

    const response = userService.login(user);

    return {
      statusCode: 200,
      body: JSON.stringify(response)
    };
  } catch (error) {
    logger.error('Handle auth0 login error', { event }, error);
    throw error;
  }
};

export { handler };

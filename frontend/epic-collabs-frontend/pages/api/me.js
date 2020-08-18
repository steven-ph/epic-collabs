import { get } from 'lodash';
import { getAuth0Client } from '../../src/libs/auth0';

const auth0 = getAuth0Client();

export default async function me(req, res) {
  try {
    const session = await auth0.getSession(req);
    if (get(session, 'user')) {
      await auth0.handleProfile(req, res);
    } else {
      res.end();
    }
  } catch (error) {
    res.status(error.status || 500).end(error.message);
  }
}

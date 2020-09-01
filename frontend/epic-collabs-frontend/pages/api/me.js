import { get } from 'lodash';
import { getAuth0Client } from 'libs/auth0';

const auth0 = getAuth0Client();

export default async function me(req, res) {
  try {
    const tokenCache = auth0.tokenCache(req, res);
    const data = await tokenCache.getAccessToken({ refresh: true });

    if (get(data, 'accessToken')) {
      await auth0.handleProfile(req, res);
    } else {
      res.end();
    }
  } catch (error) {
    res.end();
  }
}

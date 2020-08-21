import { getAuth0Client } from 'libs/auth0';

const auth0 = getAuth0Client();

export default async function session(req, res) {
  try {
    const tokenCache = auth0.tokenCache(req, res);

    const data = await tokenCache.getAccessToken();

    res.send(data);
  } catch (error) {
    res.end();
  }
}

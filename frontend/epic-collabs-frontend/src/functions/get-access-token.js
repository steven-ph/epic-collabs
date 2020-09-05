import { getAuth0Client } from 'libs/auth0';

const auth0 = getAuth0Client();

const getAccessToken = async ({ req, res }) => {
  const tokenCache = auth0.tokenCache(req, res);

  const data = await tokenCache.getAccessToken({ refresh: true });

  return data;
};

export { getAccessToken };

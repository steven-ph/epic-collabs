import { initAuth0 } from '@auth0/nextjs-auth0';
import { getConfig } from 'config';

const {
  AUTH0_CLIENT_ID,
  AUTH0_SECRET,
  AUTH0_AUDIENCE,
  AUTH0_DOMAIN,
  AUTH0_REDIRECT_URL,
  SESSION_COOKIE_SECRET,
  BASE_URL
} = getConfig();

let client = null;

const getAuth0Client = () => {
  if (client) {
    return client;
  }

  client = initAuth0({
    domain: AUTH0_DOMAIN,
    clientId: AUTH0_CLIENT_ID,
    clientSecret: AUTH0_SECRET,
    redirectUri: AUTH0_REDIRECT_URL,
    audience: AUTH0_AUDIENCE,
    postLogoutRedirectUri: BASE_URL,
    session: {
      cookieSecret: SESSION_COOKIE_SECRET,
      cookieLifetime: 60 * 60 * 24, // 24hrs
      storeIdToken: true,
      storeRefreshToken: true,
      storeAccessToken: true
    }
  });

  return client;
};

export { getAuth0Client };

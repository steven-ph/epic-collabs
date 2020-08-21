import { get } from 'lodash';
import { setContext } from '@apollo/client/link/context';
import { getAuth0Client } from 'libs/auth0';

const auth0 = getAuth0Client();

const getAccessToken = async ctx => {
  console.log({ ctx });
  const inAppContext = Boolean(ctx.ctx);

  const req = inAppContext ? ctx.ctx.req : ctx.req;
  const res = inAppContext ? ctx.ctx.res : ctx.res;

  try {
    const tokenCache = auth0.tokenCache(req, res);
    const data = await tokenCache.getAccessToken();

    return get(data, 'accessToken') || '';
    // eslint-disable-next-line
  } catch (error) {
    return '';
  }
};

const attachAuth = ctx => async () => {
  const accessToken = await getAccessToken(ctx);
  console.log({ accessToken });
  return {
    headers: {
      authorization: `Bearer ${accessToken}`
    }
  };
};

const makeAuthLink = ctx => setContext(attachAuth(ctx));

export { makeAuthLink };

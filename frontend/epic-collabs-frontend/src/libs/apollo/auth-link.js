import { setContext } from '@apollo/client/link/context';
import { parseToken } from './parse-token';

const makeHeaders = token => ({
  headers: {
    authorization: `Bearer ${token || ''}`
  }
});

const makeAuthLink = ctx =>
  setContext(() => {
    if (ctx) {
      return makeHeaders(parseToken(ctx).token);
    }

    // return authService.getToken().then(makeHeaders);
    return makeHeaders('');
  });

export { makeAuthLink };

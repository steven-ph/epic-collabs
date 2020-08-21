import jwtDecode from 'jwt-decode';
import { isAfter } from 'date-fns';
import { parseCookies } from 'nookies';

const isTokenValid = token => {
  if (!token) {
    return false;
  }

  const decodedToken = jwtDecode(token);
  const expiresAt = decodedToken.exp * 1000;

  return isAfter(expiresAt, Date.now());
};

const parseToken = ctx => {
  try {
    const inAppContext = Boolean(ctx.ctx);

    const cookies = parseCookies(inAppContext ? ctx.ctx : ctx);
    const token = cookies['auth0_token'];
    const valid = isTokenValid(token);

    return {
      token,
      valid
    };
  } catch {
    return {
      token: '',
      valid: false
    };
  }
};

export { parseToken };

import { getAuth0Client } from 'libs/auth0';
import { getAccessToken } from 'functions/get-access-token';

const auth0 = getAuth0Client();

export default async function me(req, res) {
  try {
    const { accessToken } = await getAccessToken({ req, res });

    if (accessToken) {
      await auth0.handleProfile(req, res);
    } else {
      res.end();
    }
  } catch (error) {
    res.end();
  }
}

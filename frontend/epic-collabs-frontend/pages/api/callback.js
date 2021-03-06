import { getAuth0Client } from 'libs/auth0';

export default async function callback(req, res) {
  try {
    await getAuth0Client().handleCallback(req, res);
  } catch (error) {
    res.status(error.status || 400).end(error.message);
  }
}

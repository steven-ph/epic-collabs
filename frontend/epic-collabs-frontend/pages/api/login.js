import { getAuth0Client } from 'libs/auth0';

export default async function login(req, res) {
  try {
    await getAuth0Client().handleLogin(req, res);
  } catch (error) {
    res.status(error.status || 400).end(error.message);
  }
}

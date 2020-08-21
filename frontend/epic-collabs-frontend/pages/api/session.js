import { getAuth0Client } from 'libs/auth0';

const auth0 = getAuth0Client();

export default async function session(req, res) {
  try {
    const session = await auth0.getSession(req);
    res.send(session);
  } catch (error) {
    res.status(error.status || 500).end(error.message);
  }
}

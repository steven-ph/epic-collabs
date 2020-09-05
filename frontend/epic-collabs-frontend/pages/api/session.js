import { getAccessToken } from 'functions/get-access-token';

export default async function session(req, res) {
  try {
    const data = await getAccessToken({ req, res });
    res.send(data);
  } catch (error) {
    res.send({});
  }
}

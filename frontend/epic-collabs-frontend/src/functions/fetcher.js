import fetch from 'cross-fetch';

const fetcher = url => fetch(url).then(res => res.json());

export { fetcher };

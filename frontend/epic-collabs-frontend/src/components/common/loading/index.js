import Head from 'next/head';
import { ReactSVG } from 'react-svg';
import { Flexbox } from 'components/common';

const Loading = ({ icon = 'flying-rocket' }) => (
  <>
    <Head>
      <title>Epic Collabs | Loading...</title>
    </Head>
    <Flexbox flexDirection="column" justifyContent="center" alignItems="center" flexGrow={1} height="100%">
      <ReactSVG src={`/images/svg/${icon}.svg`} />
    </Flexbox>
  </>
);

export { Loading };

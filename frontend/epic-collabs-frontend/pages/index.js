import Head from 'next/head';
import { withAuth } from 'components/hoc/with-auth';
import { LandingPage } from 'components/landing-page';

const Index = props => {
  return (
    <>
      <Head>
        <title>Epic Collabs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LandingPage {...props} />
    </>
  );
};

export default withAuth(Index, { isProtected: false });

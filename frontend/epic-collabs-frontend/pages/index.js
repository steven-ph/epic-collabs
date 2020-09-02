import Head from 'next/head';
import { withAuth } from 'hoc/with-auth';
import { LandingLayout } from 'layouts';
import { LandingPage } from 'components/landing-page';

const Index = props => {
  return (
    <>
      <Head>
        <title>Epic Collabs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LandingLayout>
        <LandingPage {...props} />
      </LandingLayout>
    </>
  );
};

export default withAuth(Index, { isProtected: false });

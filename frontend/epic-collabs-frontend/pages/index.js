import Head from 'next/head';
import { LandingPage } from 'components/landing-page';

const Index = () => {
  return (
    <>
      <Head>
        <title>Epic Collabs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LandingPage />
    </>
  );
};

export default Index;

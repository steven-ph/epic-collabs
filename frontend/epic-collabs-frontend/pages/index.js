import Head from 'next/head';
import { Navigation } from 'components/navigation';

const Index = () => {
  return (
    <div>
      <Head>
        <title>Epic Collabs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <main>
        <h1>Epic Collabs</h1>
      </main>
    </div>
  );
};

export default Index;

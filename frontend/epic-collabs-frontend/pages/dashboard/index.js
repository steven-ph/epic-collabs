import Head from 'next/head';
import { withAuth } from 'hoc/with-auth';
import { CommonLayout } from 'layouts';

const DashboardPage = () => {
  return (
    <>
      <Head>
        <title>Epic Collabs | Dashboard</title>
      </Head>
      <CommonLayout>
        <div>DASHBOARD</div>
      </CommonLayout>
    </>
  );
};

export default withAuth(DashboardPage, { isProtected: true });

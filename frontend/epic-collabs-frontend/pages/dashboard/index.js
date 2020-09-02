import Head from 'next/head';
import { withAuth } from 'hoc/with-auth';
import { CommonLayout } from 'layouts';
import { Loading } from 'components/common';

const DashboardPage = () => {
  return (
    <>
      <Head>
        <title>Epic Collabs | Dashboard</title>
      </Head>
      <CommonLayout>
        <Loading />
      </CommonLayout>
    </>
  );
};

export default withAuth(DashboardPage, { isProtected: false });

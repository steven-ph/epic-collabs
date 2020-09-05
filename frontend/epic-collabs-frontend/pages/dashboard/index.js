import { Dashboard } from 'components/dashboard';
import { withAuth } from 'hoc/with-auth';
import { CommonLayout } from 'layouts';
import Head from 'next/head';

const DashboardPage = props => {
  return (
    <>
      <Head>
        <title>Epic Collabs | Dashboard</title>
      </Head>
      <CommonLayout>
        <Dashboard {...props} />
      </CommonLayout>
    </>
  );
};

export default withAuth(DashboardPage);

import Head from 'next/head';
import { withAuth } from 'hoc/with-auth';
import { CommonLayout } from 'layouts';

const MyProfilePage = () => {
  return (
    <>
      <Head>
        <title>Epic Collabs | Your Profile</title>
      </Head>
      <CommonLayout>
        <div>YOUR PROFILE PAGE</div>
      </CommonLayout>
    </>
  );
};

export default withAuth(MyProfilePage, { isProtected: true });

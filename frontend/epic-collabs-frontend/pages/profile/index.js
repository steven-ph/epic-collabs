import { UserProfile } from 'components/user-profile';
import { withAuth } from 'hoc/with-auth';
import { CommonLayout } from 'layouts';
import Head from 'next/head';

const MyProfilePage = props => {
  return (
    <>
      <Head>
        <title>Epic Collabs | Your Profile</title>
      </Head>
      <CommonLayout>
        <UserProfile {...props} />
      </CommonLayout>
    </>
  );
};

export default withAuth(MyProfilePage, { isProtected: true });

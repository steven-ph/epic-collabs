import Head from 'next/head';
import { get } from 'lodash';
import { CommonLayout } from 'layouts';
import { withAuth } from 'hoc/with-auth';
import { UserProfile } from 'components/user-profile';

const ProfilePage = ({ user }) => {
  const userId = get(user, 'sub');

  return (
    <>
      <Head>
        <title>{`Epic Collabs | ${user.name}`}</title>
      </Head>
      <CommonLayout>
        <UserProfile userId={userId} />
      </CommonLayout>
    </>
  );
};

export default withAuth(ProfilePage);

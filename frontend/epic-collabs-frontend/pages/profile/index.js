import Head from 'next/head';
import { CommonLayout } from 'layouts';
import { withAuth } from 'hoc/with-auth';
import { UserProfile } from 'components/user-profile';
import { useGetUserProfileById } from 'hooks/use-user-profile';
import { Loading } from 'components/common';

const ProfilePage = ({ user }) => {
  const { loading, profile } = useGetUserProfileById({ id: user.sub });

  return (
    <>
      <Head>
        <title>{`Epic Collabs | ${user.name}`}</title>
      </Head>
      <CommonLayout>{loading ? <Loading /> : <UserProfile profile={profile} />}</CommonLayout>
    </>
  );
};

export default withAuth(ProfilePage, { isProtected: true });

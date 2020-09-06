import Head from 'next/head';
import styled from 'styled-components';
import { get, isEmpty } from 'lodash';
import { breakpoints } from 'styles';
import { useAuthContext } from 'context/auth';
import { AboutMe } from './about-me';
import { ProfileMasthead } from './masthead';
import { PersonalDetails } from './personal-details';
import { Box, CenteredContainer, Loading } from 'components/common';
import { useGetUserProfileById } from 'hooks/use-user-profile';

const UserProfile = ({ userId }) => {
  const { user } = useAuthContext();
  const { loading, profile } = useGetUserProfileById({ id: userId });

  const authUserId = get(user, 'sub');
  const profileId = get(profile, '_id');
  const isOwnProfile = !isEmpty(authUserId) && !isEmpty(profileId) && authUserId === profileId;

  if (loading || isEmpty(profile)) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>{`Epic Collabs | ${profile.name}`}</title>
      </Head>
      <ProfileMasthead profile={profile} isOwnProfile={isOwnProfile} />
      <CenteredContainer>
        <ProfileContainer>
          <PersonalDetails profile={profile} isOwnProfile={isOwnProfile} />
          <AboutMe profile={profile} isOwnProfile={isOwnProfile} />
        </ProfileContainer>
      </CenteredContainer>
    </>
  );
};

const ProfileContainer = styled(Box)`
  padding-top: 80px;

  @media (max-width: ${breakpoints.sm}) {
    padding-top: 22px;
  }
`;

export { UserProfile };

import styled from 'styled-components';
import { get, isEmpty } from 'lodash';
import { breakpoints } from 'styles';
import { AboutMe } from './about-me';
import { ProfileMasthead } from './masthead';
import { PersonalDetails } from './personal-details';
import { Box, CenteredContainer, Loading } from 'components/common';
import { useGetUserProfileById } from 'hooks/use-user-profile';

const UserProfile = ({ userId }) => {
  const { loading, profile } = useGetUserProfileById({ id: userId });

  const profileId = get(profile, '_id');
  const isOwnProfile = !isEmpty(userId) && !isEmpty(profileId) && userId === profileId;

  if (loading || isEmpty(profile)) {
    return <Loading />;
  }

  return (
    <>
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

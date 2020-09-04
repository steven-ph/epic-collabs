import styled from 'styled-components';
import { breakpoints } from 'styles';
import { useAuthContext } from 'context/auth';
import { AboutMe } from './about-me';
import { ProfileMasthead } from './masthead';
import { PersonalDetails } from './personal-details';
import { Box, CenteredContainer } from 'components/common';

const UserProfile = ({ profile }) => {
  const { user } = useAuthContext();

  const isOwnProfile = user && profile && user.sub && profile._id && user.sub === profile._id;

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

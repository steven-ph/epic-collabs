import styled from 'styled-components';
import { breakpoints } from 'styles';
import { AboutMe } from './about-me';
import { ProfileMasthead } from './masthead';
import { PersonalDetails } from './personal-details';
import { Box, CenteredContainer } from 'components/common';

const UserProfile = ({ user }) => {
  return (
    <>
      <ProfileMasthead profile={user} />
      <CenteredContainer>
        <ProfileContainer>
          <PersonalDetails profile={user} />
          <AboutMe profile={user} />
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

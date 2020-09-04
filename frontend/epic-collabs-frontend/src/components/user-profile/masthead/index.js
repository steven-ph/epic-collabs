import React from 'react';
import styled from 'styled-components';
import { breakpoints, colours, defaultTheme, easing } from 'styles';
import { Box, Flexbox, CenteredContainer } from 'components/common';
import { SocialButtonsList } from './SocialButtonsList';

const AVATAR_SIZE = 150;
const AVATAR_SMALL_SIZE = 100;
const { fonts, lineHeights, fontSizes, fontWeights } = defaultTheme;

const ProfileMasthead = ({ profile }) => {
  const { name, picture, socialNetworkUrls } = profile;

  return (
    <StyledProfileMasthead>
      <StyledCenteredContainer>
        <Flexbox alignItems="left" justifyContent="left">
          <Box pr={'32px'} height={['90px']}>
            <ProfilePicture src={picture} alt={name} />
          </Box>
          <Box sx={{ alignSelf: 'center' }}>
            <Flexbox sx={{ paddingTop: '10px' }}>
              <StyledDisplayNameBox>
                <StyledDisplayName>{name}</StyledDisplayName>
              </StyledDisplayNameBox>
            </Flexbox>
            <SocialButtonsList socialNetworkUrls={socialNetworkUrls} />
          </Box>
        </Flexbox>
      </StyledCenteredContainer>
    </StyledProfileMasthead>
  );
};

const StyledCenteredContainer = styled(CenteredContainer)`
  @media only screen and (min-width: 0px) and (max-width: ${breakpoints.xs}) and (orientation: portrait) {
    max-height: 400px;
    width: 300px;
    height: auto;
  }
`;

const StyledProfileMasthead = styled.div`
  color: ${colours.white};
  max-height: 400px;
  height: auto;

  @media only screen and (min-width: 0px) and (max-width: ${breakpoints.xxl}) and (orientation: portrait) {
    max-height: 500px;
    padding-bottom: 15px;
    padding-left: 17px;
    padding-right: 17px;
  }
`;

const ProfilePicture = styled.img`
  border: 3px solid white;
  border-radius: 50%;
  width: ${AVATAR_SIZE}px;
  height: ${AVATAR_SIZE}px;
  box-shadow: 0 3px 10px 2px ${colours.shade};
  position: relative;
  left: 0px;
  top: 15px;

  @media only screen and (min-width: 0px) and (max-width: ${breakpoints.sm}) {
    width: ${AVATAR_SMALL_SIZE}px;
    height: ${AVATAR_SMALL_SIZE}px;
    transition: all 0.3s ${easing.default};
  }
`;

const StyledDisplayName = styled.div`
  font-family: ${fonts.brand};
  font-size: 40px;
  color: ${colours.navy700};
  font-weight: ${fontWeights.semiBold};
  letter-spacing: -0.5px;
  line-height: ${lineHeights.rg};
  text-align: left;

  @media only screen and (min-width: 0px) and (max-width: ${breakpoints.xxs}) and (orientation: portrait) {
    max-width: 220px;
    width: auto;
    font-size: ${fontSizes.lg};
    transition: all 0.3s ${easing.default};
  }

  @media only screen and (min-width: 321px) and (max-width: 767px) {
    width: auto;
    font-size: ${fontSizes.xl};
    transition: all 0.3s ${easing.default};
  }
`;

const StyledDisplayNameBox = styled(Box)`
  width: auto;
  max-width: 100%;
`;

export { ProfileMasthead };

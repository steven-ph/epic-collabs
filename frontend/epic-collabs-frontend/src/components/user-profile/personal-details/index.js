import React from 'react';
import styled from 'styled-components';
import { colors, defaultTheme } from 'styles';
import { Box, Flexbox } from 'components/common';
import { SectionLayout } from 'components/user-profile/layout';

const { fontSizes, fontWeights } = defaultTheme;

const PersonalDetails = ({ profile }) => {
  const { name, email } = profile;

  return (
    <SectionLayout heading={'Personal Details'}>
      <Flexbox>
        <Box width={'100%'}>
          <Flexbox flexGrow={1} width={'100%'} justifyContent="start" flexDirection={{ _: 'column', sm: 'row' }}>
            <Box width={'100%'}>
              <StyledLabel>Full Name</StyledLabel>
              <StyledParagraph>{name}</StyledParagraph>
            </Box>
            <Box width={'100%'}>
              <StyledLabel>Contact Email</StyledLabel>
              <StyledParagraph>{email}</StyledParagraph>
            </Box>
          </Flexbox>
        </Box>
      </Flexbox>
    </SectionLayout>
  );
};

const StyledLabel = styled.label`
  font-size: ${fontSizes.sm};
  color: ${colors.navy700};
  font-weight: ${fontWeights.semiBold};
  line-height: 17px;
`;

const StyledParagraph = styled.p`
  font-weight: ${fontWeights.regular};
  font-size: ${fontSizes.sm};
  color: ${colors.darkGrey800};
`;

export { PersonalDetails };

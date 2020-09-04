import React from 'react';
import styled from 'styled-components';
import { colours, defaultTheme } from 'styles';
import { Box, Flexbox } from 'components/common';

const { breakpoints, fonts, fontSizes, fontWeights } = defaultTheme;

const SectionLayout = ({ id, backgroundColor, className, heading, subheading, headingRightComponent, children }) => (
  <StyledSectionLayout id={id} className={className} backgroundColor={backgroundColor || colours.white}>
    <Flexbox flexDirection={{ _: 'column-reverse', sm: 'row' }}>
      <Box width={'100%'}>
        <h2>{heading}</h2>
        <StyledParagraph>{subheading}</StyledParagraph>
      </Box>
      <Box textAlign={'right'} width={{ _: '100%', sm: '20%' }}>
        {headingRightComponent}
      </Box>
    </Flexbox>
    {children}
  </StyledSectionLayout>
);

const StyledSectionLayout = styled(Box)`
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 4px;
  box-shadow: 0 6px 10px 0 rgba(7, 1, 82, 0.05);
  padding: 24px 24px;
  margin-bottom: 24px;

  h2 {
    color: ${colours.navy700};
    margin-bottom: 0;
    font-family: ${fonts.brand};
    font-weight: ${fontWeights.bold};
  }

  @media (min-width: 0px) and (max-width: ${breakpoints.xs}) and (orientation: portrait) {
    margin-bottom: 24px;
    max-width: ${breakpoints.xs};

    h2 {
      font-size: ${fontSizes.xl};
    }

    p {
      font-size: ${fontSizes.sm};
    }
  }
`;

const StyledParagraph = styled.p`
  color: ${colours.darkGrey100};
  font-weight: ${fontWeights.regular};
`;

export { SectionLayout };

import React from 'react';
import styled from 'styled-components';
import { colours, defaultTheme } from 'styles';
import { SectionLayout } from 'components/user-profile/layout';

const { fontSizes, fontWeights } = defaultTheme;

const Biography = ({ bio }) => {
  return !bio ? <EmptyBio>There isn't a bio here yet!</EmptyBio> : <Bio>{bio}</Bio>;
};

const AboutMe = ({ profile }) => {
  const { bio } = profile;
  return (
    <SectionLayout heading={'About Me'}>
      <Biography bio={bio} />
    </SectionLayout>
  );
};

const Bio = styled.span`
  font-weight: ${fontWeights.regular};
  font-size: ${fontSizes.sm};
  color: ${colours.darkGrey800};
`;

const EmptyBio = styled.span`
  font-weight: ${fontWeights.regular};
  font-size: ${fontSizes.sm};
  font-style: italic;
  color: ${colours.darkGrey100};
`;

export { AboutMe };

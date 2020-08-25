import React from 'react';
import styled from 'styled-components';
import { breakpoints, easing } from 'styles';
import { Flexbox, Headline, Title, Subtitle } from 'components/common';

const LandingPage = () => {
  return (
    <Flexbox flexDirection="column" justifyContent="center">
      <Headline>Find collaborators</Headline>
      <Headline>Build projects</Headline>
      <Img src="/images/meeting.jpg" alt="Epic Collabs" />
      <Title>Build a team around your idea</Title>
      <Subtitle>Epic Collabs is a community of engineers, designers, project managers, and creators.</Subtitle>
    </Flexbox>
  );
};

const Img = styled.img`
  align-self: center;
  margin: 32px;
  width: 500px;
  height: 500px;
  transition: all 0.2s ${easing.default};

  @media screen and (max-width: ${breakpoints.sm}) {
    margin: 16px;
    width: 300px;
    height: 300px;
  }

  @media screen and (max-width: ${breakpoints.md}) {
    margin: 16px;
    width: 400px;
    height: 400px;
  }
`;

export { LandingPage };

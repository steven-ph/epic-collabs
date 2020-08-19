import React from 'react';
import styled from 'styled-components';
import { breakpoints } from 'styles';
import { Headline, Title, Subtitle } from 'components/typography';

const LandingPage = () => (
  <Container>
    <Headline>Find collaborators</Headline>
    <Headline>Build projects</Headline>
    <Img src="/images/meeting.jpg" alt="Epic Collabs" />
    <Title>Build a team around your idea</Title>
    <Subtitle>
      Epic Collabs is a community of engineers, designers, project managers, and
      creators.
    </Subtitle>
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Img = styled.img`
  align-self: center;
  margin: 32px;
  width: 500px;
  height: 500px;

  @media screen and (max-width: ${breakpoints.sm}) {
    margin: 16px;
    width: 300px;
    height: 300px;
  }
`;

export { LandingPage };

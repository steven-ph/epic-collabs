import React from 'react';
import styled from 'styled-components';
import { Headline, Title, Subtitle } from 'components/typography';

const LandingPage = () => (
  <Container>
    <Headline>Find collaborators</Headline>
    <Headline>Build projects</Headline>
    <Img
      src="/images/meeting.jpg"
      alt="Epic Collabs"
      width="500px"
      height="500px"
      margin="32px"
    />
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
  margin: ${({ margin }) => margin};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;

export { LandingPage };

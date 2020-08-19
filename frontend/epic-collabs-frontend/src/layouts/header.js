import React from 'react';
import styled from 'styled-components';
import { Navigation } from 'components/navigation';
import { colours } from 'styles';

const Header = () => (
  <StyledHeader>
    <Container>
      <Navigation />
    </Container>
  </StyledHeader>
);

const StyledHeader = styled.header`
  z-index: 1;
  top: 0;
  left: 0;
  position: fixed;
  height: 60px;
  width: 100%;
  padding: 5px 20px;
  background-color: ${colours.white};
  border-bottom: 1px solid ${colours.navy100};
`;

const Container = styled.div`
  margin: 0 auto;
  height: 100%;
`;

export { Header };

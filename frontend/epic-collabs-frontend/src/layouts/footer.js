import React from 'react';
import styled from 'styled-components';
import { colours } from 'styles';

const Footer = () => (
  <StyledFooter>
    <Container>
      <span>Lorem ipsum</span>
    </Container>
  </StyledFooter>
);

const StyledFooter = styled.footer`
  background-color: ${colours.lightGrey200};
  flex-shrink: 0;
  padding: 20px;
`;

const Container = styled.div`
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export { Footer };

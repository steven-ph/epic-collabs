import React from 'react';
import styled from 'styled-components';
import { colours } from 'styles';
import { SmallText } from 'components/typography';

const Footer = () => (
  <StyledFooter>
    <Container>
      <SmallText>Made with ♥ by SP</SmallText>
    </Container>
  </StyledFooter>
);

const StyledFooter = styled.footer`
  width: 100%;
  padding: 10px 10px;
  flex-shrink: 0;
  border-radius: 12px 12px 0 0;
  background-color: ${colours.lightGrey200};
`;

const Container = styled.div`
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  small {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
`;

export { Footer };

import React from 'react';
import styled from 'styled-components';
import { colors } from 'styles';
import { Flexbox, SmallText } from 'components/common';

const Footer = () => (
  <StyledFooter>
    <Container alignItems="center" justifyContent="center" sx={{ margin: '0 auto', height: '100%' }}>
      <SmallText>Made with ♥ by SP</SmallText>
    </Container>
  </StyledFooter>
);

const StyledFooter = styled.footer`
  width: 100%;
  padding: 10px 10px;
  flex-shrink: 0;
  border-radius: 12px 12px 0 0;
  background-color: ${colors.lightGrey200};
`;

const Container = styled(Flexbox)`
  small {
    user-select: none;
  }
`;

export { Footer };

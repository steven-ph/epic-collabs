import React from 'react';
import styled from 'styled-components';
import { colours } from 'styles';
import { Box } from 'components/common';
import { Navigation } from 'components/navigation';

const Header = () => (
  <StyledHeader>
    <Box sx={{ margin: '0 auto', height: '100%' }}>
      <Navigation />
    </Box>
  </StyledHeader>
);

const StyledHeader = styled.header`
  z-index: 1;
  top: 0;
  left: 0;
  position: fixed;
  height: 80px;
  width: 100%;
  padding: 5px 10px;
  border-radius: 0 0 12px 12px;
  background-color: ${colours.white};
  border-bottom: 1px solid ${colours.navy100};
`;

export { Header };

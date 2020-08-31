import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'next/router';
import { colours, typography } from 'styles';
import { Box } from 'components/common';
import { Navigation } from 'components/navigation';

const LandingLayout = withRouter(({ children }) => {
  return (
    <PageLayout>
      <Header>
        <Navigation textColor={colours.lightGrey400} />
      </Header>
      <Body>{children}</Body>
    </PageLayout>
  );
});

const PageLayout = styled(Box)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${colours.navy900};
  font-size: 16px;
  font-family: ${typography.bodyFont};

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 0;
    margin-bottom: 0;
    font-family: ${typography.brandFont};
  }

  p,
  small {
    margin-top: 0;
    margin-bottom: 0;
  }
`;

const Body = styled.main`
  flex: 1 0 auto;
`;

const Header = styled.header`
  z-index: 1;
  top: 0;
  left: 0;
  position: fixed;
  height: 80px;
  width: 100%;
  padding-right: 32px;
  border-radius: 0 0 12px 12px;
  background-color: transparent;
`;

export { LandingLayout };

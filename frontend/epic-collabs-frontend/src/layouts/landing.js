import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'next/router';
import { colours } from 'styles';
import { DefaultLayout } from './components/layout';
import { Navigation } from 'components/navigation';

const LandingLayout = withRouter(({ children }) => {
  return (
    <PageLayout>
      <Header>
        <Navigation textColor={colours.lightGrey900} altColor={colours.lightGrey200} />
      </Header>
      <Body>{children}</Body>
    </PageLayout>
  );
});

const PageLayout = styled(DefaultLayout)`
  background-color: ${colours.navy900};
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

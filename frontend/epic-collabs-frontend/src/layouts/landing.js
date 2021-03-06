import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'next/router';
import { rgba } from 'polished';
import { colors } from 'styles';
import { DefaultLayout } from './components/layout';
import { Navigation } from 'components/navigation';

const LandingLayout = withRouter(({ children }) => {
  return (
    <PageLayout>
      <Header>
        <Navigation textColor={colors.lightGrey900} altColor={colors.lightGrey200} />
      </Header>
      <Body>{children}</Body>
    </PageLayout>
  );
});

const PageLayout = styled(DefaultLayout)`
  background-color: ${colors.navy900};
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
  background-image: linear-gradient(to top, transparent 0%, ${rgba(colors.navy900, 0.85)} 100%);
`;

export { LandingLayout };

import { withRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { colors } from 'styles';
import { Body } from './components/body';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { DefaultLayout } from './components/layout';

const CommonLayout = withRouter(({ children }) => {
  return (
    <PageLayout>
      <Header />
      <Body>{children}</Body>
      <Footer />
    </PageLayout>
  );
});

const PageLayout = styled(DefaultLayout)`
  background-color: ${colors.lightGrey300};
`;

export { CommonLayout };

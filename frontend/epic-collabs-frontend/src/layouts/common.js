import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'next/router';
import { colours } from 'styles';
import { Header } from './components/header';
import { Body } from './components/body';
import { Footer } from './components/footer';
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
  background-color: ${colours.lightGrey300};
`;

export { CommonLayout };

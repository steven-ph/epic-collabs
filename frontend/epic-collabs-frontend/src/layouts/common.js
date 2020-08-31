import React from 'react';
import { withRouter } from 'next/router';
import { Header } from './components/header';
import { Body } from './components/body';
import { Footer } from './components/footer';
import { DefaultLayout } from './components/layout';

const CommonLayout = withRouter(({ children }) => {
  return (
    <DefaultLayout>
      <Header />
      <Body>{children}</Body>
      <Footer />
    </DefaultLayout>
  );
});

export { CommonLayout };

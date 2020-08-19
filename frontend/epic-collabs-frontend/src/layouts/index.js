import React from 'react';
import { Layout as _Layout } from 'antd';
import NProgress from 'nprogress';
import styled from 'styled-components';
import { Router, withRouter } from 'next/router';
import { colours, typography } from 'styles';
import { Header } from './header';
import { Body } from './body';
import { Footer } from './footer';

NProgress.configure({ parent: 'body', showSpinner: false });

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const Layout = withRouter(({ children }) => {
  return (
    <PageLayout>
      <Header />
      <Body>{children}</Body>
      <Footer />
    </PageLayout>
  );
});

const PageLayout = styled(_Layout)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${colours.white};
  font-size: 16px;
  font-family: ${typography.bodyFont};

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 700;
    font-family: ${typography.mainFont};
  }
`;

export { Layout };

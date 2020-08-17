import 'styles/styles.less';

import React from 'react';
import NProgress from 'nprogress';
import styled from 'styled-components';
import { Router, withRouter } from 'next/router';
import { typography } from 'styles';

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

const CommonLayout = withRouter(({ children }) => {
  return <Layout>{children}</Layout>;
});

const Layout = styled.div`
  display: none;
  background-color: ${({ backgroundColor }) => backgroundColor};
  background-image: ${({ backgroundImage }) =>
    backgroundImage ? 'url(' + backgroundImage + ')' : 'none'};
  background-repeat: no-repeat;
  background-position: center top;
  padding: ${({ padding }) => padding || 0};
  font-size: 16px;
  font-family: ${typography.bodyFont};
  position: relative;
  color: #fff;
  display: block !important;
  max-width: 100vw;
  min-height: 100vh;
  overflow: hidden;

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

export { CommonLayout };

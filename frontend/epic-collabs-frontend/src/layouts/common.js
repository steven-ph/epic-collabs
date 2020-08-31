import React from 'react';
import { Layout as _Layout } from 'antd';
import styled from 'styled-components';
import { withRouter } from 'next/router';
import { colours, typography } from 'styles';
import { Header } from './components/header';
import { Body } from './components/body';
import { Footer } from './components/footer';

const CommonLayout = withRouter(({ children }) => {
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

export { CommonLayout };

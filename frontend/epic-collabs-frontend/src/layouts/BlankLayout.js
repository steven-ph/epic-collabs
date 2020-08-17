import React from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CommonLayout } from './CommonLayout';

const BlankLayout = props => (
  <CommonLayout>
    <StyledLayout>
      <PageBody>
        <Container>{props.children}</Container>
      </PageBody>
    </StyledLayout>
  </CommonLayout>
);

BlankLayout.propTypes = {
  children: PropTypes.node
};

const StyledLayout = styled(Layout)`
  background-color: #090258;
  min-height: 100vh;

  &.ant-layout {
    height: auto;
  }
`;

const PageBody = styled.div`
  flex-grow: 1;
`;

const Container = styled.div`
  max-width: 90em;
  margin: 0 auto;
  padding-left: 15px;
  padding-right: 15px;
`;

export { BlankLayout };

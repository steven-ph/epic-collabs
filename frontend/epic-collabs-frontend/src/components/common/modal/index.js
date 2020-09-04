import React from 'react';
import { Modal as _Modal } from 'antd';
import styled from 'styled-components';
import { colours, defaultTheme } from 'styles';

const { fonts, fontSizes, fontWeights, lineHeights } = defaultTheme;

const Modal = ({ title, visible, onOk, confirmLoading, onCancel, width, footer, children, ...rest }) => {
  return (
    <StyledModal
      destroyOnClose={true}
      maskClosable={false}
      title={title}
      visible={visible}
      onOk={onOk}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      width={width}
      footer={footer}
      {...rest}
    >
      {children}
    </StyledModal>
  );
};

const ModalHeading = ({ title, subtitle }) => {
  return (
    <>
      <ModalTitle>{title}</ModalTitle>
      {subtitle && <ModalSubtitle variant={'subtitle'}>{subtitle}</ModalSubtitle>}
    </>
  );
};

const StyledModal = styled(_Modal)`
  .ant-modal {
    transform-origin: -147px 0px 0px;
  }

  .ant-modal-body {
    padding: 10px 24px 0 24px;
  }

  .ant-modal-footer {
    padding: 0 24px 24px;
    border-top: 0px;
  }

  .ant-form-item-label {
    line-height: 2;
  }
`;

const ModalTitle = styled.h2`
  line-height: ${lineHeights.rg};
  font-family: ${fonts.brand};
  font-weight: ${fontWeights.bold};
  font-size: ${fontSizes['2xl']};
  color: ${colours.navy600};
  margin: 4px 0 2px 0;
`;

const ModalSubtitle = styled.h2`
  font-family: 'inherit';
  font-size: ${fontSizes.sm};
  font-weight: ${fontWeights.regular};
  color: ${colours.darkGrey700};
  line-height: ${lineHeights.rg};
  margin: 0;
`;

export { Modal, ModalHeading };

import React from 'react';
import { Button as AntButton } from 'antd';
import styled from 'styled-components';
import is, { match, isNot } from 'styled-is';
import propTypes from '@styled-system/prop-types';
import {
  space,
  layout,
  color,
  border,
  flex,
  flexGrow,
  flexShrink,
  flexBasis,
  alignSelf,
  justifySelf,
  order,
  typography
} from 'styled-system';
import { colours } from 'styles';

const getStyleForType = ({ type, theme }) => {
  const themeColor = theme.colors.button[type];
  if (!themeColor) {
    return;
  }

  return `
    color: ${themeColor.color};
    background-color: ${themeColor.background};
    border-color: ${themeColor.border};

    &:hover:not([disabled]) {
      background-color: ${themeColor.backgroundHover};
      border-color: ${themeColor.borderHover};
    };

    &[disabled],
    &.ant-btn-loading {
      opacity: 0.6;
      color: ${themeColor.color};
    };
  `;
};

const StyledButton = styled(AntButton)`
  &&& {
    height: auto;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    line-height: 1.75;
    padding: 5px 17px;

    &:hover:not([disabled]) {
      background-color: ${colours.lightGrey500};
      border-color: ${colours.lightGrey500};
    };
    &[disabled],
    &.ant-btn-loading {
      color: ${colours.shade};
    };

    ${match('size', 'small')`
      padding: 2px 11px;
    `}

    ${match('size', 'large')`
      font-size: 16px;
      padding: 11px 23px;
    `}

    ${is('rounded')`
      border-radius: 99px;
    `}

    /* Default button styling */
    ${isNot('type')`
      background-color: ${({ theme }) => theme.colors.button.default.background};
      border-color: ${({ theme }) => theme.colors.button.default.border};
      color: ${({ theme }) => theme.colors.button.default.color};

      &:hover:not([disabled]) {
        background-color: ${({ theme }) => theme.colors.button.default.backgroundHover};
        border-color: ${({ theme }) => theme.colors.button.default.borderHover};
        color: ${({ theme }) => theme.colors.button.default.colorHover};
      };
    `}

    ${match('type', 'link')`
      background-color: transparent;
      &:hover:not([disabled]) {
        background-color: transparent;
      }
    `}

    ${getStyleForType}
  }

  &&&&&&& {
    ${space};
    ${layout};
    ${color};
    ${border};
    ${flex};
    ${flexGrow};
    ${flexShrink};
    ${flexBasis};
    ${alignSelf};
    ${justifySelf};
    ${order};
    ${typography};

    &:hover {
      background-color: ${({ hoverBg }) => hoverBg};
      color: ${({ hoverColor }) => hoverColor};
    }
  }
`;

const Button = props => <StyledButton {...props} />;

Button.propTypes = {
  ...AntButton.propTypes,

  ...propTypes.space,
  ...propTypes.layout,
  ...propTypes.color,
  ...propTypes.border,
  ...propTypes.flex,
  ...propTypes.flexGrow,
  ...propTypes.flexShrink,
  ...propTypes.flexBasis,
  ...propTypes.alignSelf,
  ...propTypes.justifySelf,
  ...propTypes.order,
  ...propTypes.typography
};

export { Button };

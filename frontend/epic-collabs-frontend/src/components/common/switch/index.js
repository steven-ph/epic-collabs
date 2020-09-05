import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Switch as _Switch } from 'antd';
import { colors } from 'styles';

const Check = ({ colour, size }) => (
  <svg width={size} viewBox="0 0 15 12" version="1.1">
    <g id="Components" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="Forms" transform="translate(-576.000000, -2393.000000)" fill={colour} fillRule="nonzero">
        <g id="Group-2" transform="translate(564.000000, 2385.000000)">
          <polygon id="Path-Copy-6" points="17.17 16.89 14.06 13.78 13 14.84 17.17 19 26.12 10.05 25.06 9"></polygon>
        </g>
      </g>
    </g>
  </svg>
);

const Switch = props => {
  return (
    <StyledSwitch
      checkedChildren={<Check colour={props.disabled ? colors.lightGrey900 : colors.white} size="15px" />}
      {...props}
    />
  );
};

const StyledSwitch = styled(_Switch)`
  & {
    margin: 2px 12px 2px 0;
    width: 55px;
    height: 28px;
    line-height: 28px;
    background-color: ${colors.lightGrey900};
    border: 1px solid ${colors.lightGrey900};

    &::after {
      margin: 1px;
      width: 22px;
      height: 22px;
      box-shadow: none;
    }
  }

  &.ant-switch-checked {
    background-color: ${colors.blue};
    border: 1px solid ${colors.blue};

    &::after {
      margin-left: -2px;
    }
  }

  .anticon {
    margin-left: -2px;
  }

  .ant-switch-handle {
    top: 3px;
    width: 20px;
    height: 20px;
  }

  &.ant-switch-disabled {
    opacity: 1;
    background-color: ${colors.lightGrey300};
    border: 1px solid ${colors.lightGrey900};

    &::after {
      background-color: ${colors.lightGrey900};
    }
  }
`;

Switch.propTypes = {
  ..._Switch.propTypes,
  label: PropTypes.string,
  colon: PropTypes.bool,
  preserve: PropTypes.bool,
  autoFocus: PropTypes.bool,
  checked: PropTypes.bool,
  checkedChildren: PropTypes.func,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  size: PropTypes.string,
  unCheckedChildren: PropTypes.func,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  className: PropTypes.string
};

export { Switch };

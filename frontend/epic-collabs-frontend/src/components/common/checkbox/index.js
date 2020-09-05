import styled from 'styled-components';
import { Checkbox as _Checkbox } from 'antd';
import PropTypes from 'prop-types';
import { colors } from 'styles';

const Checkbox = props => <StyledCheckbox {...props} />;

const StyledCheckbox = styled(_Checkbox)`
  .ant-checkbox-input {
    width: 0px;
    height: 0px;
  }

  .ant-checkbox-inner::after {
    top: 44%;
    left: 20%;
    width: 7px;
    height: 14px;
  }

  .ant-checkbox span.ant-checkbox-inner {
    width: 22px;
    height: 22px;
    background-color: ${colors.white};

    border: 1px solid ${colors.lightGrey900};

    &:hover {
      border: 1px solid ${colors.darkGrey300};
    }
  }

  .ant-checkbox-checked span.ant-checkbox-inner {
    border-radius: ${({ theme }) => theme.radii.sm};
    background-color: ${colors.blue};
    border: 1px solid ${colors.blue};
  }

  .ant-checkbox-checked::after {
    border: 2px solid ${colors.blue900};
  }

  .ant-checkbox-disabled span.ant-checkbox-inner {
    background-color: ${colors.lightGrey300};
    border: 1px solid ${colors.lightGrey900} !important;
  }
`;

Checkbox.propTypes = {
  ..._Checkbox.propTypes,
  required: PropTypes.bool,
  colon: PropTypes.bool,
  message: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  preserve: PropTypes.bool
};

Checkbox.Group = _Checkbox.Group;

export { Checkbox };

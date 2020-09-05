import React from 'react';
import styled from 'styled-components';
import { Radio as _Radio, Form } from 'antd';

const Radio = ({
  name,
  required = false,
  preserve = true,
  initialValue,
  options,
  label = '',
  rules = [],
  ...props
}) => (
  <FormItem
    name={name}
    label={label}
    preserve={preserve}
    required={required}
    initialValue={initialValue}
    rules={rules}
    {...props}
  >
    <_Radio.Group {...props}>
      {Object.entries(options).map(([key, val]) => (
        <StyledRadio key={key} value={key}>
          {val}
        </StyledRadio>
      ))}
    </_Radio.Group>
  </FormItem>
);

const FormItem = styled(Form.Item)`
  & .style1 {
    & .ant-radio span.ant-radio-inner {
      width: 22px;
      height: 22px;
      background-color: #ffffff;
      border: 1px solid #bfcce3;
      border-radius: 11px;
    }

    .ant-radio-inner::after {
      top: 4px;
      left: 4px;
      width: 12px;
      height: 12px;
    }
  }

  & .style2 {
    & .ant-radio span.ant-radio-inner {
      width: 22px;
      height: 22px;
      background-color: red;
      border: 1px solid #bfcce3;
      border-radius: 11px;
    }

    .ant-radio-inner::after {
      top: 4px;
      left: 4px;
      width: 12px;
      height: 12px;
    }
  }
`;

const StyledRadio = styled(_Radio)`
  & .ant-radio span.ant-radio-inner {
    width: 22px;
    height: 22px;
    background-color: #ffffff;
    border: 1px solid #bfcce3;
    border-radius: 11px;
  }

  .ant-radio-inner::after {
    top: 4px;
    left: 4px;
    width: 12px;
    height: 12px;
  }
`;

Radio.Button = _Radio.Button;

Radio.Group = _Radio.Group;

export { Radio };

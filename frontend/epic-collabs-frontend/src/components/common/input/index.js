import React from 'react';
import styled from 'styled-components';
import { Input as _Input, Form } from 'antd';

const Input = ({
  form,
  label,
  placeholder,
  required = false,
  message = 'Please enter a value',
  name,
  prefix,
  preserve = true,
  ...props
}) => (
  <>
    <FormItem label={label} required={required} {...props}>
      {form.getFieldDecorator(name, {
        preserve,
        rules: required ? [{ required, message }] : []
      })(
        <StyledInput
          addonBefore={prefix}
          placeholder={placeholder}
          disabled={props.disabled || false}
          autoFocus={true}
        />
      )}
    </FormItem>
  </>
);

const FormItem = styled(Form.Item)`
  &&& {
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    text-align: left;
    padding-bottom: 0;
    border-radius: 3px;
    font-family: ${({ theme }) => theme.brandFont};
    margin-bottom: ${({ theme }) => theme.space['s2']};
  }

  & .ant-form-item-label {
    padding-bottom: 0;
    margin-bottom: ${({ theme }) => theme.space['s1']};
    font-size: ${({ theme }) => theme.fontSizes.rg};
    font-weight: 600;
    line-height: 24px;
  }

  & .ant-form-item-label label {
    color: #3b4966;
  }

  & .has-error .ant-form-item-children input.ant-input {
    border: 2px solid #ff1675;
    box-shadow: inset 0 2px 1px 0 rgba(3, 2, 22, 0.05);
  }

  & .has-error .ant-form-explain {
    color: #ff1675;
    padding: 5px 0 0 0;
  }
`;

const StyledInput = styled(_Input)`
  &.ant-input {
    height: 36px;
    width: 400px;
    background-color: #ffffff;
    border: 1px solid #bdcae1;
    box-shadow: inset 0 2px 1px 0 rgba(3, 2, 22, 0.05);
  }

  &.ant-input:focus {
    border: 2px solid #427dff;
  }

  &.ant-input:hover:not(:focus):not([disabled]) {
    border: 1px solid #8b9dbb;
  }

  &.ant-input:disabled {
    border-radius: 3px;
    background-color: #f8f9fe;
    border: 1px solid #bdcae1;
    box-shadow: inset 0 2px 1px 0 rgba(3, 2, 22, 0.05);
  }
`;

Input.propTypes = {
  ..._Input.propTypes
};

export { Input };

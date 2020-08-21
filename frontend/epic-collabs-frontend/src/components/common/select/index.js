import React from 'react';
import styled from 'styled-components';
import { Form, Select as _Select, Icon } from 'antd';

const Select = ({
  form,
  name,
  label = '',
  placeholder = 'Select an option',
  required = true,
  preserve = true,
  message = 'Please enter a value',
  options,
  disabled,
  onChange,
  initialValue,
  ...props
}) => (
  <FormItem label={label} required={false} {...props}>
    {form.getFieldDecorator(name, {
      preserve,
      initialValue,
      rules: required ? [{ required, message }] : []
    })(
      <StyledSelect
        required
        onChange={onChange}
        disabled={form.disabled || disabled}
        optionFilterProp="children"
        filterOption={(i, { props: { children } }) => children.toLowerCase().indexOf(i.toLowerCase()) >= 0}
        placeholder={placeholder}
        autoFocus={props.autoFocus}
        suffixIcon={<Icon type="caret-down" />}
        dropdownStyle={{ maxWidth: '400px' }}
        showAction={['focus', 'click']}
      >
        {options.map((opt, index) => (
          <Select.Option key={index} value={opt}>
            {opt}
          </Select.Option>
        ))}
      </StyledSelect>
    )}
  </FormItem>
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

  & .has-error .ant-form-item-children .ant-select-selection {
    border-radius: 3px;
    border: 2px solid #ff1675;
    box-shadow: 0 2px 3px 0 rgba(3, 2, 22, 0.05), inset 0 2px 1px 0 rgba(3, 2, 22, 0.05);

    .ant-select-arrow {
      color: #bdcae1;
    }
  }

  & .has-error .ant-form-explain {
    color: ${({ theme }) => theme.red};
    padding: 5px 0 0 0;
  }
`;

const StyledSelect = styled(_Select)`
  .ant-select-selection {
    width: 400px;
    height: 36px;
    border-radius: 3px;
    background-color: #ffffff;
    border: 1px solid #bdcae1;
    box-shadow: 0 2px 3px 0 rgba(3, 2, 22, 0.05), inset 0 0px 0px 0 rgba(3, 2, 22, 0.05);

    &:hover {
      border: 1px solid #8596b7;
      box-shadow: 0 2px 3px 0 rgba(3, 2, 22, 0.05), inset 0 0px 0px 0 rgba(3, 2, 22, 0.05);
    }
  }

  &.ant-select-focused .ant-select-selection {
    border: 1px solid #427dff;
    box-shadow: inset 0 0 0 1px #427dff;
  }

  &.ant-select-disabled .ant-select-selection {
    background-color: #f7f9fc;
    border: 1px solid #bdcae1;
    box-shadow: 0 0px 0px 0 rgba(3, 2, 22, 0.05), inset 0 0px 0px 0 rgba(3, 2, 22, 0.05);
  }

  .ant-select-selection__rendered {
    line-height: 36px;
  }

  .ant-select-selection__placeholder {
    color: #adbad0;
  }

  .ant-select-selection-selected-value {
    color: #4a5d85;
  }
`;

export { Select };

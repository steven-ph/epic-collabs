import React, { useEffect, useState } from 'react';
import { Form, Input } from 'antd';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { Button } from 'components/common';
import { colors, defaultTheme } from 'styles';
import { bioValidator } from 'functions/bio-validator';
import { USER_PROFILE_BY_ID_QUERY, UPDATE_USER_PROFILE_MUTATION } from 'gql/user';

const { fontSizes, fontWeights } = defaultTheme;

const AboutMeForm = ({ userId, bio, onUpdate, onError, onCancel }) => {
  const [form] = Form.useForm();
  const [biography, setBiography] = useState(bio);
  const [updateProfile, { loading }] = useMutation(UPDATE_USER_PROFILE_MUTATION);

  useEffect(() => {
    setBiography(bio);
  }, [userId, bio]);

  const onCancelClick = () => {
    form.resetFields();
    onCancel();
  };

  const onSubmit = () => {
    const input = {
      _id: userId,
      bio: biography
    };

    return (
      updateProfile({
        variables: { input },
        refetchQueries: [
          {
            query: USER_PROFILE_BY_ID_QUERY,
            variables: { id: userId }
          }
        ]
      })
        .then(() => onUpdate('Biography updated'))
        // eslint-disable-next-line no-unused-vars
        .catch(error => onError('Failed to update biography'))
    );
  };

  return (
    <Form form={form} name="edit-about-me">
      <StyledFormItem
        rules={[
          {
            max: 3500,
            message: 'You have reached the 3500 character limit'
          },
          {
            validator: bioValidator,
            message: 'You have entered characters that are not allowed'
          }
        ]}
      >
        <StyledTextArea
          defaultValue={bio}
          data-testid={'biography-textarea'}
          autosize={{ maxRows: 12 }}
          style={{ minHeight: '110px' }}
          onChange={event => setBiography(event.target.value)}
        />
        <Button type={'primary'} onClick={onSubmit} loading={loading} style={{ minWidth: '80px' }}>
          Save
        </Button>
        <Button onClick={onCancelClick} style={{ minWidth: '80px', marginLeft: '10px' }}>
          Cancel
        </Button>
      </StyledFormItem>
    </Form>
  );
};

const StyledFormItem = styled(Form.Item)`
  margin-bottom: 0;

  .ant-form-explain {
    margin-top: 10px;
  }
`;

const StyledTextArea = styled(Input.TextArea)`
  background-color: ${colors.white};
  border: 1px solid ${colors.lightGrey200};
  border-radius: 3px;
  box-shadow: inset 0 1px 4px 0 ${colors.tint};
  margin-bottom: 10px;
  font-weight: ${fontWeights.regular};
  font-size: ${fontSizes.sm};
  color: ${colors.darkGrey800};
`;

export { AboutMeForm };

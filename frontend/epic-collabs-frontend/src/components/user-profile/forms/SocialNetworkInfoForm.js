import React, { useEffect, useState } from 'react';
import { assign, map, values } from 'lodash';
import styled from 'styled-components';
import { Form, Input, Tooltip } from 'antd';
import { useMutation } from '@apollo/client';
import { colors, defaultTheme } from 'styles';
import { Flexbox, Button, Icon, Modal, ModalHeading } from 'components/common';
import { USER_PROFILE_BY_ID_QUERY, UPDATE_USER_PROFILE_MUTATION } from 'gql/user';

const { fontSizes, fontWeights } = defaultTheme;

const socialUrlPattern = name => {
  // eslint-disable-next-line
  return new RegExp(`\\http(?:s)?:\/\/(?:www.)?${name}\.com\/(.+)\/?`);
};

const SocialNetworkInfoForm = ({ userId, socialNetworks, visible, onUpdate, onCancel, onError }) => {
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState({});

  const [updateProfile, { loading }] = useMutation(UPDATE_USER_PROFILE_MUTATION);

  useEffect(() => {
    const data = assign(
      ...values(socialNetworks).map(s => ({
        [s.name]: s.url
      }))
    );

    setFormValues(data);
  }, [userId, socialNetworks, visible]);

  const onCancelClick = () => {
    form.resetFields();
    onCancel();
  };

  const onSubmit = () => {
    return (
      form
        .validateFields()
        .then(values => {
          const input = {
            _id: userId,
            socialNetworks: map(
              values,
              (val, key) =>
                val &&
                key && {
                  name: key,
                  url: val
                }
            ).filter(Boolean)
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
              .then(() => onUpdate('Social network info updated'))
              // eslint-disable-next-line no-unused-vars
              .catch(error => onError('Failed to update social network info'))
          );
        })
        // eslint-disable-next-line no-unused-vars
        .catch(error => {
          onError('Please double check your input');
        })
    );
  };

  return (
    <>
      <Modal
        width={'750px'}
        visible={visible}
        onCancel={onCancelClick}
        title={<ModalHeading title={'Social Network'} />}
        okButtonProps={{ disabled: loading }}
        footer={[
          <Button key={'cancel'} type="default" onClick={onCancelClick}>
            Cancel
          </Button>,
          <Button key={'save'} type="primary" loading={loading} onClick={onSubmit}>
            Save
          </Button>
        ]}
      >
        <StyledSocialLabel>
          <label>Social Network URLs</label>
          <p>Copy and paste the link for your social accounts here</p>
        </StyledSocialLabel>
        <Form form={form} name="edit-social-network-urls">
          <Flexbox flexDirection="column" flexGrow={1} pr={{ _: '0px', md: '20px' }}>
            <Form.Item
              colon={false}
              hasFeedback
              name="github"
              label={
                <Tooltip title="Github">
                  <Icon name="github" width="22px" />
                </Tooltip>
              }
              initialValue={formValues['github']}
              rules={[
                {
                  pattern: socialUrlPattern('github'),
                  message: 'Please ensure you use the following format: https://www.github.com/yourusername'
                }
              ]}
            >
              <Input width={'100%'} data-testid={'github-input'} placeholder="https://www.github.com/yourusername" />
            </Form.Item>
            <Form.Item
              colon={false}
              hasFeedback
              name="linkedin"
              label={
                <Tooltip title="LinkedIn">
                  <Icon name="linkedin" width="22px" />
                </Tooltip>
              }
              initialValue={formValues['linkedin']}
              rules={[
                {
                  pattern: socialUrlPattern('linkedin'),
                  message: 'Please ensure you use the following format: https://www.linkedin.com/in/yourusername'
                }
              ]}
            >
              <Input
                width={'100%'}
                data-testid={'linkedin-input'}
                placeholder="https://www.linkedin.com/in/yourusername"
              />
            </Form.Item>
            <Form.Item
              colon={false}
              hasFeedback
              name="facebook"
              label={
                <Tooltip title="Facebook">
                  <Icon name="facebook" width="22px" />
                </Tooltip>
              }
              initialValue={formValues['facebook']}
              rules={[
                {
                  pattern: socialUrlPattern('facebook'),
                  message: 'Please ensure you use the following format: https://www.facebook.com/yourusername'
                }
              ]}
            >
              <Input
                width={'100%'}
                data-testid={'facebook-input'}
                placeholder="https://www.facebook.com/yourusername"
              />
            </Form.Item>
            <Form.Item
              colon={false}
              hasFeedback
              name="twitter"
              label={
                <Tooltip title="Twitter">
                  <Icon name="twitter" width="22px" />
                </Tooltip>
              }
              initialValue={formValues['twitter']}
              rules={[
                {
                  pattern: socialUrlPattern('twitter'),
                  message: 'Please ensure you use the following format: https://www.twitter.com/yourusername'
                }
              ]}
            >
              <Input width={'100%'} data-testid={'twitter-input'} placeholder="https://www.twitter.com/yourusername" />
            </Form.Item>
          </Flexbox>
        </Form>
      </Modal>
    </>
  );
};

const StyledSocialLabel = styled.div`
  label {
    font-size: ${fontSizes.sm};
    color: ${colors.navy600};
    font-weight: ${fontWeights.semiBold};
  }

  p {
    font-weight: ${fontWeights.rg};
    font-size: ${fontSizes.xs};
    color: ${colors.navy400};
  }
`;

export { SocialNetworkInfoForm };

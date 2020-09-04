import React from 'react';
import { Tooltip } from 'antd';
import styled from 'styled-components';
import { colours } from 'styles';
import { Box, Flexbox, Icon } from 'components/common';

const SOCIAL_NETWORK_ICONS = {
  github: 'github',
  facebook: 'facebook',
  linkedin: 'linkedin',
  twitter: 'twitter'
};

const socialLinks = () => {
  return [
    {
      name: 'Github',
      icon: SOCIAL_NETWORK_ICONS['github']
    },
    {
      name: 'Facebook',
      icon: SOCIAL_NETWORK_ICONS['facebook']
    },
    {
      name: 'Linkedin',
      icon: SOCIAL_NETWORK_ICONS['linkedin']
    },
    {
      name: 'Twitter',
      icon: SOCIAL_NETWORK_ICONS['twitter']
    }
  ];
};

const Links = ({ links }) => {
  return links.map((link, index) => {
    if (link.url) {
      return (
        <a key={index} href={link.url} rel="noopener noreferrer" target="_blank">
          <Icon name={link.icon} width="20px" fill={colours.navy700} />
        </a>
      );
    }

    return (
      <Box key={index} sx={{ opacity: '30%' }}>
        <Tooltip
          placement="bottom"
          title={
            <p style={{ textAlign: 'center', marginBottom: 0 }}>
              You haven&apos;t added your {link.name} profile link yet.
            </p>
          }
        >
          <Icon name={link.icon} fill={colours.navy700} width="20px" />
        </Tooltip>
      </Box>
    );
  });
};

const SocialButtonsList = ({ socialNetworkUrls }) => (
  <Container>
    <Links links={socialLinks(socialNetworkUrls)} />
  </Container>
);

const Container = styled(Flexbox)`
  margin-top: 15px;
  margin-left: 0px;
  padding-left: 0px;

  div {
    padding-right: 20px;
  }
`;

export { SocialButtonsList };

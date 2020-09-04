import React from 'react';
import { Tooltip } from 'antd';
import styled from 'styled-components';
import { find, map, lowerCase, startCase } from 'lodash';
import { colours } from 'styles';
import { Box, Flexbox, Icon } from 'components/common';

const SOCIAL_NETWORKS = {
  github: 'github',
  linkedin: 'linkedin',
  facebook: 'facebook',
  twitter: 'twitter'
};

const generateSocialLinks = (socialNetworks = []) =>
  map(SOCIAL_NETWORKS, name => {
    const found = find(socialNetworks, { name }) || {};

    return {
      name: startCase(name),
      url: found.url || null,
      icon: SOCIAL_NETWORKS[lowerCase(name)]
    };
  });

const Links = ({ links }) => {
  return links.map(({ name, url, icon }, index) => {
    if (url) {
      return (
        <Box key={index}>
          <a href={url} rel="noopener noreferrer" target="_blank">
            <Icon name={icon} width="20px" fill={colours.navy700} />
          </a>
        </Box>
      );
    }

    return (
      <Box key={index} sx={{ opacity: '30%' }}>
        <Tooltip
          placement="bottom"
          title={
            <p style={{ textAlign: 'center', marginBottom: 0 }}>You haven&apos;t added your {name} profile link yet.</p>
          }
        >
          <Icon name={icon} fill={colours.navy700} width="20px" />
        </Tooltip>
      </Box>
    );
  });
};

const SocialButtonsList = ({ socialNetworks }) => (
  <Container>
    <Links links={generateSocialLinks(socialNetworks)} />
  </Container>
);

const Container = styled(Flexbox)`
  align-items: center;

  div {
    margin-right: 8px;
  }
`;

export { SocialButtonsList };

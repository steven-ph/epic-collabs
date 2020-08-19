import React from 'react';
import styled from 'styled-components';
import { Avatar, Button, Dropdown, Menu } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSortDown,
  faSignInAlt,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import { colours } from 'styles';

const getDropdownMenu = ({ name }) => (
  <StyledMenu>
    <Menu.Item key="0">
      <a href="/">
        <div>
          <DropdownLabelSmall>Signed in as</DropdownLabelSmall>
          <DropdownLabel>{name}</DropdownLabel>
        </div>
      </a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="2">
      <a href="/api/logout">
        <LoginLogout>
          <DropdownLabel>Logout</DropdownLabel>
          <FontAwesomeIcon icon={faSignOutAlt} />
        </LoginLogout>
      </a>
    </Menu.Item>
  </StyledMenu>
);

const UserNav = ({ user }) => {
  if (!user) {
    return (
      <a href="/api/login">
        <LoginLogout>
          <DropdownLabel>Login</DropdownLabel>
          <FontAwesomeIcon icon={faSignInAlt} />
        </LoginLogout>
      </a>
    );
  }

  const { picture, name } = user;

  return (
    <Dropdown
      trigger={['click']}
      overlay={getDropdownMenu(user)}
      placement="bottomRight"
    >
      <ProfileButton>
        <Avatar src={picture} size={48} alt={name} />
        <FontAwesomeIcon icon={faSortDown} />
      </ProfileButton>
    </Dropdown>
  );
};

const LoginLogout = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;

  svg {
    color: ${colours.navy};
    width: 20px;
    transition: transform 0.2s ease-in-out;
  }

  &:hover svg {
    transform: translateX(5px);
  }
`;

const StyledMenu = styled(Menu)`
  min-width: 180px;
`;

const ProfileButton = styled.div`
  display: flex;
  align-items: center;
  margin-left: 6px;
  cursor: pointer;

  svg {
    width: 14px;
    margin-left: 6px;
    margin-top: -3px;
    color: ${colours.navyDark};
    transition: transform 0.2s ease-in-out;
  }

  &:hover svg {
    transform: translateY(5px);
  }
`;

const DropdownLabelSmall = styled.small`
  display: block;
  width: 100%;
  color: ${colours.navy};
  font-weight: 300;
  font-size: 14px;
  line-height: 1.428;
  white-space: nowrap;
`;

const DropdownLabel = styled.span`
  display: block;
  width: 100%;
  color: ${colours.navy};
  font-weight: 500;
  font-size: 14px;
  line-height: 1.428;
  white-space: nowrap;
`;

export { UserNav };

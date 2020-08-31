import React from 'react';
import styled from 'styled-components';
import { Avatar, Dropdown, Menu } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { breakpoints, colours, easing } from 'styles';
import { useUserContext } from 'context/user';
import { Link } from 'components/link';
import { Flexbox } from 'components/common';

const getDropdownMenu = ({ name }) => (
  <StyledMenu>
    <Menu.Item key="0">
      <Link href="/">
        <div>
          <DropdownLabelSmall>Signed in as</DropdownLabelSmall>
          <DropdownLabel>{name}</DropdownLabel>
        </div>
      </Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="2">
      <a href="/api/logout">
        <LoginLogout>
          <DropdownLabel>Logout</DropdownLabel>
          <Icon icon={faSignOutAlt} />
        </LoginLogout>
      </a>
    </Menu.Item>
  </StyledMenu>
);

const UserNav = ({ downArrowColor = colours.navy }) => {
  const { user, loading } = useUserContext();

  if (!user && !loading) {
    return (
      <a href="/api/login">
        <LoginLogout>
          <DropdownLabel color={downArrowColor}>Login</DropdownLabel>
          <Icon icon={faSignInAlt} color={downArrowColor} />
        </LoginLogout>
      </a>
    );
  }

  if (user) {
    const { picture, name } = user;
    return (
      <Dropdown trigger={['click']} overlay={getDropdownMenu({ name })} placement="bottomRight">
        <ProfileButton alignItems="center">
          <StyledAvatar src={picture} alt={name} />
          <ArrowDownIcon icon={faSortDown} color={downArrowColor} />
        </ProfileButton>
      </Dropdown>
    );
  }

  return null;
};

const LoginLogout = styled(Flexbox)`
  align-items: center;
  justify-items: center;

  svg {
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

const ProfileButton = styled(Flexbox)`
  margin-left: 6px;
  cursor: pointer;

  svg {
    width: 14px;
    margin-top: -3px;
    transition: transform 0.2s ease-in-out;
  }

  &:hover svg {
    transform: translateY(5px);
  }
`;

const StyledAvatar = styled(Avatar)`
  height: 40px;
  width: 40px;
  transition: all 0.2s ${easing.default};

  @media screen and (max-width: ${breakpoints.sm}) {
    height: 32px;
    width: 32px;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  margin-left: 6px;
`;

const ArrowDownIcon = styled(FontAwesomeIcon)`
  margin-left: 6px;

  @media screen and (max-width: ${breakpoints.sm}) {
    display: none;
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
  color: ${({ color }) => color || colours.navy};
  font-weight: 500;
  font-size: 14px;
  line-height: 1.428;
  white-space: nowrap;
`;

export { UserNav };

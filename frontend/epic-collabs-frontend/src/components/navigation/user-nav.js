import React from 'react';
import styled from 'styled-components';
import { Avatar, Dropdown, Menu } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { breakpoints, colours } from 'styles';
import { useUserContext } from 'context/user';
import { Link } from 'components/link';

const getDropdownMenu = ({ name }) => (
  <StyledMenu>
    <Menu.Item key="0">
      <Link href="/">
        <>
          <DropdownLabelSmall>Signed in as</DropdownLabelSmall>
          <DropdownLabel>{name}</DropdownLabel>
        </>
      </Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="2">
      <Link href="/api/logout">
        <LoginLogout>
          <DropdownLabel>Logout</DropdownLabel>
          <Icon icon={faSignOutAlt} />
        </LoginLogout>
      </Link>
    </Menu.Item>
  </StyledMenu>
);

const UserNav = () => {
  const { user, loading } = useUserContext();

  if (!user && !loading) {
    return (
      <Link href="/api/login">
        <LoginLogout>
          <DropdownLabel>Login</DropdownLabel>
          <Icon icon={faSignInAlt} />
        </LoginLogout>
      </Link>
    );
  }

  if (user) {
    const { picture, name } = user;
    return (
      <Dropdown trigger={['click']} overlay={getDropdownMenu({ name })} placement="bottomRight">
        <ProfileButton>
          <StyledAvatar src={picture} alt={name} />
          <Icon icon={faSortDown} />
        </ProfileButton>
      </Dropdown>
    );
  }

  return null;
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
    margin-top: -3px;
    color: ${colours.navyDark};
    transition: transform 0.2s ease-in-out;
  }

  &:hover svg {
    transform: translateY(5px);
  }
`;

const StyledAvatar = styled(Avatar)`
  height: 48px;
  width: 48px;

  @media screen and (max-width: ${breakpoints.sm}) {
    height: 32px;
    width: 32px;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  margin-left: 6px;
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

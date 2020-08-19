import React from 'react';
import styled from 'styled-components';
import { breakpoints, colours } from 'styles';
import { useUserContext } from 'context/user';
import { UserNav } from './UserNav';

const Navigation = () => {
  const { user, loading } = useUserContext();

  if (!loading) {
    return (
      <Container>
        <Left>
          <LogoContainer>LOGO_HERE</LogoContainer>
          <NavContainer>MENU_HERE</NavContainer>
        </Left>
        <Right>
          <UserNav user={user} />
        </Right>
      </Container>
    );
  }

  return <Right />;
};

const Container = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;

  > * + * {
    margin-left: 0.75em;
  }
`;

const Left = styled.div`
  display: flex;
`;

const Right = styled.div`
  display: flex;
  align-items: center;

  > * + * {
    margin-left: 0.75em;
  }
`;

const LogoContainer = styled.div`
  display: inline-block;
  max-width: 200px;
  margin-right: 32px;
  padding: 0.875em 0;
  z-index: 1;

  @media (max-width: ${breakpoints.xl}) {
    max-width: 150px;

    img {
      width: 100%;
      height: auto;
    }
  }
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;

  a {
    display: flex;
    align-items: center;
    color: ${colours.white};
    white-space: nowrap;

    &:hover,
    &:focus {
      color: ${colours.white};
      text-decoration: none;
    }

    &:last-child {
      padding-right: 0;
    }
  }
`;

export { Navigation };

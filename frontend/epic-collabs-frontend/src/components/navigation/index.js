import React from 'react';
import { Input } from 'antd';
import { ReactSVG } from 'react-svg';
import styled from 'styled-components';
import { useUserContext } from 'context/user';
import { UserNav } from './UserNav';
import { Link } from 'components/link';
import { Title } from 'components/typography';

const Navigation = () => {
  const { user, loading } = useUserContext();

  if (!loading) {
    return (
      <Container>
        <Left>
          <HomeLink href="/">
            <LogoContainer>
              <ReactSVG src={'/images/svg/rocket.svg'} />
              <Title>EpicCollabs</Title>
            </LogoContainer>
          </HomeLink>
        </Left>
        <Middle>
          <NavContainer>
            <Input.Search
              placeholder="Search for something..."
              onSearch={value => console.log(value)}
            />
          </NavContainer>
        </Middle>
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
  height: 100%;

  > * + * {
    margin-left: 0.75em;
  }
`;

const HomeLink = styled(Link)`
  align-self: center;

  h1 {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
`;

const Left = styled.div`
  display: flex;
`;

const Middle = styled.div`
  display: flex;
  flex-grow: 1;
  margin-left: 32px;
  margin-right: 32px;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  svg {
    width: 48px;
    margin-right: 16px;
  }
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
`;

export { Navigation };

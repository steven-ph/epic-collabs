import React from 'react';
import { Input } from 'antd';
import { ReactSVG } from 'react-svg';
import styled from 'styled-components';
import { breakpoints } from 'styles';
import { UserNav } from './user-nav';
import { Link } from 'components/link';
import { Title } from 'components/common/typography';

const Navigation = () => {
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
          <SearchInput placeholder="Search for something..." onSearch={value => console.log(value)} />
        </NavContainer>
      </Middle>
      <Right>
        <UserNav />
      </Right>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100%;

  > * + * {
    margin-left: 28px;
  }

  @media screen and (max-width: ${breakpoints.sm}) {
    > * + * {
      margin-left: 8px;
    }
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

  @media screen and (max-width: ${breakpoints.sm}) {
    h1 {
      display: none;
    }

    svg {
      width: 40px;
      margin-right: 5px;
    }
  }

  @media screen and (max-width: ${breakpoints.md}) {
    h1 {
      display: none;
    }
  }
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled(Input.Search)`
  min-width: 150px;
`;

export { Navigation };

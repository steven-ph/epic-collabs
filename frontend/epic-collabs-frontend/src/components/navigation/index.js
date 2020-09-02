import React from 'react';
import { Input } from 'antd';
import { ReactSVG } from 'react-svg';
import styled from 'styled-components';
import { Styled } from 'theme-ui';
import { breakpoints, colours, easing } from 'styles';
import { Flexbox, Link } from 'components/common';
import { UserNav } from './user-nav';
import { NavLink } from './nav-link';
import { MENU_ITEMS } from './nav-config';

const Navigation = ({ textColor = colours.darkGrey800, altColor = colours.navy900 }) => {
  return (
    <Container>
      <Flexbox>
        <Link href="/" sx={{ alignSelf: 'center' }}>
          <LogoContainer alignItems="center">
            <ReactSVG src={'/images/svg/rocket.svg'} />
            <Title textColor={textColor}>EpicCollabs</Title>
          </LogoContainer>
        </Link>
      </Flexbox>
      <Flexbox flexGrow={1}>
        <SearchContainer>
          <Input.Search placeholder="Search..." onSearch={value => console.log(value)} />
        </SearchContainer>
        {MENU_ITEMS.map(({ key, href, isNew }, index) => (
          <NavLink key={index} item={key} href={href} isNew={!!isNew} textColor={textColor} altColor={altColor} />
        ))}
      </Flexbox>
      <Flexbox alignItems="center">
        <UserNav downArrowColor={textColor} />
      </Flexbox>
    </Container>
  );
};

const Container = styled(Flexbox)`
  height: 100%;

  > * + * {
    margin-left: 28px;
  }
`;

const Title = styled(Styled.h4)`
  font-weight: 500 !important;
  text-align: center;
  color: ${({ textColor }) => textColor} !important;
  user-select: none;

  @media screen and (max-width: ${breakpoints.md}) {
    display: none;
  }
`;

const LogoContainer = styled(Flexbox)`
  cursor: pointer;

  svg {
    width: 48px;
    margin-left: 16px;
    margin-right: 16px;
    transition: all 0.2s ${easing.default};
  }

  @media screen and (max-width: ${breakpoints.sm}) {
    svg {
      width: 40px;
      margin-right: 5px;
    }
  }
`;

const SearchContainer = styled(Flexbox)`
  align-items: center;
  margin-right: 8px;
  width: 260px;

  @media (${breakpoints.lg}) {
    width: 300px;
  }
`;

export { Navigation };

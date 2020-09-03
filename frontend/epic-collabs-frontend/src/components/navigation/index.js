import { Input } from 'antd';
import { Flexbox, Link } from 'components/common';
import React from 'react';
import { ReactSVG } from 'react-svg';
import styled from 'styled-components';
import { breakpoints, colours, easing } from 'styles';
import { Styled } from 'theme-ui';
import { MENU_ITEMS } from './nav-config';
import { NavLink } from './nav-link';
import { UserNav } from './user-nav';

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
        <SearchContainer alignItems="center">
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

  @media screen and (max-width: ${breakpoints.sm}) {
    > * + * {
      margin-left: 12px;
    }
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

  &:hover {
    svg {
      transform: scale(1.05);
    }
  }

  @media screen and (max-width: ${breakpoints.sm}) {
    svg {
      width: 40px;
      margin-right: 5px;
    }
  }
`;

const SearchContainer = styled(Flexbox)`
  margin-right: 8px;
  width: 260px;

  @media (${breakpoints.lg}) {
    width: 300px;
  }

  @media screen and (max-width: ${breakpoints.sm}) {
    display: none;
  }
`;

export { Navigation };

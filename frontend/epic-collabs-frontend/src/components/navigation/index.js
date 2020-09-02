import React from 'react';
import { Input } from 'antd';
import { ReactSVG } from 'react-svg';
import styled from 'styled-components';
import { Styled } from 'theme-ui';
import { breakpoints, colours, easing } from 'styles';
import { UserNav } from './user-nav';
import { Link } from 'components/link';
import { Flexbox } from 'components/common';

const Navigation = ({ textColor = colours.darkGrey900 }) => {
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
        <Flexbox alignItems="center">
          <SearchInput placeholder="Search..." onSearch={value => console.log(value)} />
        </Flexbox>
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
      margin-left: 8px;
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

  @media screen and (max-width: ${breakpoints.sm}) {
    svg {
      width: 40px;
      margin-right: 5px;
    }
  }
`;

const SearchInput = styled(Input.Search)`
  min-width: 200px;
`;

export { Navigation };

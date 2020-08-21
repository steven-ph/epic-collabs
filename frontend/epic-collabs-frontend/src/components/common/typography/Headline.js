import { colours } from 'styles';
import { Styled } from 'theme-ui';
import styled from 'styled-components';

const Headline = styled(Styled.h1)`
  font-size: 32px;
  text-align: center;
  color: ${colours.darkGrey900};
`;

export { Headline };

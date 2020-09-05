import { rgba } from 'polished';
import { colors } from 'styles';
import styled, { css, keyframes } from 'styled-components';

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  display: block;
  height: ${({ size }) => size || '16px'};
  width: ${({ size }) => size || '16px'};
  border: 2px solid ${({ color }) => color || colors.green};
  border-left-color: ${({ color }) => rgba(color || colors.green, 0.3)};
  border-radius: 100%;
  animation: ${css`
    ${rotation} 0.8s infinite linear;
  `};
`;

export { Spinner };

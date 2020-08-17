import { colours } from 'styles';
import { rgba } from 'polished';
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
  height: ${props => props.size || '1.5rem'};
  width: ${props => props.size || '1.5rem'};
  border: 2px solid ${({ colour }) => colour || colours.purple900};
  border-left-color: ${({ colour }) => rgba(colour || colours.purple900, 0.3)};
  border-radius: 100%;
  animation: ${css`
    ${rotation} 0.8s infinite linear;
  `};
`;

export { Spinner };

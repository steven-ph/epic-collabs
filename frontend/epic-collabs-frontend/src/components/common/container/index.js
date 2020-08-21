import styled from 'styled-components';

import { Flexbox } from '../flexbox';

const Container = styled(Flexbox)`
  max-width: ${({ theme }) => theme.grid.max};
  padding: 0 ${({ theme }) => theme.grid.gutter};
  margin-left: auto;
  margin-right: auto;
`;

export { Container };

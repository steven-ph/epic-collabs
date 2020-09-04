import styled from 'styled-components';
import { breakpoints } from 'styles';
import { Box } from '../box';
import { Flexbox } from '../flexbox';

const Container = styled(Flexbox)`
  max-width: 90em;
  margin: 0 auto;
  padding-left: 15px;
  padding-right: 15px;
`;

const CenteredContainer = styled(Box)`
  max-width: 1440px;
  margin: 0 auto;
  padding-left: 24px;
  padding-right: 24px;
  @media only screen and (min-width: 0px) and (max-width: ${breakpoints.xs}) and (orientation: portrait) {
    max-width: ${breakpoints.xs};
    width: auto;
    padding-left: 0px;
    padding-right: 0px;
  }
`;

export { Container, CenteredContainer };

import styled from 'styled-components';
import { flexbox } from 'styled-system';
import propTypes from '@styled-system/prop-types';
import { Box } from '../box';

const Flexbox = styled(Box)({ display: 'flex' }, flexbox);

Flexbox.propTypes = {
  ...Box.propTypes,
  ...propTypes.flexbox
};

export { Flexbox };

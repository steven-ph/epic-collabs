import styled from 'styled-components';
import propTypes from '@styled-system/prop-types';
import {
  compose,
  space,
  color,
  typography,
  layout,
  background,
  border,
  position,
  grid,
  shadow,
  flex,
  flexGrow,
  flexShrink,
  flexBasis,
  alignSelf,
  justifySelf,
  order
} from 'styled-system';

const Box = styled('div')(
  compose(
    space,
    color,
    typography,
    layout,
    background,
    border,
    position,
    grid,
    shadow,
    flex,
    flexGrow,
    flexShrink,
    flexBasis,
    alignSelf,
    justifySelf,
    order
  )
);

Box.propTypes = {
  ...propTypes.space,
  ...propTypes.color,
  ...propTypes.typography,
  ...propTypes.layout,
  ...propTypes.background,
  ...propTypes.border,
  ...propTypes.position,
  ...propTypes.grid,
  ...propTypes.shadow,
  ...propTypes.flexbox
};

export { Box };

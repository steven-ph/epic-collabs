import { Box } from 'components/common';
import { ReactSVG } from 'react-svg';
import styled from 'styled-components';

const Icon = ({ name, width, fill, hoverFill, ...props }) => (
  <IconContainer width={width} fill={fill} hoverFill={hoverFill} {...props}>
    <ReactSVG src={`/images/svg/${name}.svg`} />
  </IconContainer>
);

const IconContainer = styled(Box)`
  font-size: 0;

  svg g {
    fill: ${({ fill }) => fill};
    transition: 0.2s fill ease-in-out;
  }

  &:hover svg g {
    fill: ${({ hoverFill }) => hoverFill};
  }
`;

export { Icon };

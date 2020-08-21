import styled from 'styled-components';

const Spacer = ({ width = 0, height = 0 }) => <Box width={width} height={height} />;

const Box = styled.div`
  height: ${({ width }) => width};
  width: ${({ height }) => height};
`;

export { Spacer };

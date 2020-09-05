import styled from 'styled-components';
import { Layout } from 'antd';
import { colors, typography } from 'styles';

const DefaultLayout = styled(Layout)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  font-size: 16px;
  font-family: ${typography.bodyFont};

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 0;
    margin-bottom: 0;
    font-family: ${typography.brandFont};
  }

  p,
  small {
    margin-top: 0;
    margin-bottom: 0;
  }
`;

export { DefaultLayout };

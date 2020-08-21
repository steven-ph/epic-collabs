import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider as ThemeUIThemeProvider } from 'theme-ui';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { defaultTheme } from 'styles';
import { ConfigContext } from './ConfigContext';

const ConfigProvider = ({ children, theme = defaultTheme, ...props }) => (
  <ConfigContext.Provider value={{ theme, ...props }}>
    <StyledThemeProvider theme={theme}>
      <ThemeUIThemeProvider theme={theme}>{children}</ThemeUIThemeProvider>
    </StyledThemeProvider>
  </ConfigContext.Provider>
);

ConfigProvider.propTypes = {
  theme: PropTypes.object
};

export { ConfigProvider };

import React from 'react';
import { defaultTheme } from 'styles';
import { render } from '@testing-library/react';
import { ConfigProvider } from 'components/common';

const AllTheProviders = ({ children }) => <ConfigProvider theme={defaultTheme}>{children}</ConfigProvider>;

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

const waitForGql = async () => await new Promise(resolve => setTimeout(resolve, 10));

// re-export everything
export * from '@testing-library/react';

// override render method
export { waitForGql, customRender as render };

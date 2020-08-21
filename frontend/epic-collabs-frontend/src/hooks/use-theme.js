import { useContext } from 'react';

import { ConfigContext } from 'components/common/config-provider';

/** Get/set theme from config context. */
const useTheme = () => useContext(ConfigContext).theme;

export { useTheme };

import 'styles/index.less';
import Router from 'next/router';
import NProgress from 'nprogress';
import { withApollo } from 'components/hoc/with-apollo';
import { useGetUser, UserProvider } from 'context/user';
import { defaultTheme, GlobalStyle } from 'styles';
import { ConfigProvider } from 'components/common';
import { getConfig } from 'config';

Router.events.on('routeChangeStart', () => NProgress.start());

Router.events.on('routeChangeComplete', () => NProgress.done());

Router.events.on('routeChangeError', () => NProgress.done());

const { SSR_ENABLED } = getConfig();

const EpicApp = ({ Component, pageProps }) => {
  const { user, loading } = useGetUser();

  return (
    <UserProvider value={{ user, loading }}>
      <ConfigProvider theme={defaultTheme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ConfigProvider>
    </UserProvider>
  );
};

export default withApollo(EpicApp, { ssr: SSR_ENABLED });

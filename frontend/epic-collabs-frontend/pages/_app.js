import { ConfigProvider } from 'components/common';
import { getConfig } from 'config';
import { useGetUser, UserProvider } from 'context/user';
import { withApollo } from 'hoc/with-apollo';
import Router from 'next/router';
import NProgress from 'nprogress';
import { defaultTheme } from 'styles';
import 'styles/index.less';

Router.events.on('routeChangeStart', () => NProgress.start());

Router.events.on('routeChangeComplete', () => NProgress.done());

Router.events.on('routeChangeError', () => NProgress.done());

const { SSR_ENABLED } = getConfig();

const EpicApp = ({ Component, pageProps }) => {
  const { user, loading } = useGetUser();

  return (
    <UserProvider value={{ user, loading }}>
      <ConfigProvider theme={defaultTheme}>
        <Component {...pageProps} />
      </ConfigProvider>
    </UserProvider>
  );
};

export default withApollo(EpicApp, { ssr: SSR_ENABLED });

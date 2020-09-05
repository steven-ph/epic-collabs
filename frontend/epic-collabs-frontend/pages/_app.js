import { ConfigProvider } from 'components/common';
import { getConfig } from 'config';
import { useGetAuthState, AuthProvider } from 'context/auth';
import { withApollo } from 'hoc/with-apollo';
import 'styles/index.less';
import Router from 'next/router';
import NProgress from 'nprogress';
import { defaultTheme } from 'styles';

Router.events.on('routeChangeStart', () => NProgress.start());

Router.events.on('routeChangeComplete', () => NProgress.done());

Router.events.on('routeChangeError', () => NProgress.done());

const { SSR_ENABLED } = getConfig();

const EpicApp = ({ Component, pageProps }) => {
  const { user, loading } = useGetAuthState();

  return (
    <AuthProvider value={{ user, loading }}>
      <ConfigProvider theme={defaultTheme}>
        <Component {...pageProps} />
      </ConfigProvider>
    </AuthProvider>
  );
};

export default withApollo({ ssr: SSR_ENABLED })(EpicApp);

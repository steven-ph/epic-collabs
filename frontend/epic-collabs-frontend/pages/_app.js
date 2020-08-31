import 'styles/index.less';
import NProgress from 'nprogress';
import { Router } from 'next/router';
import { getConfig } from 'config';
import { withApollo } from 'components/hoc/with-apollo';
import { useGetUser, UserProvider } from 'context/user';
import { defaultTheme, GlobalStyle } from 'styles';
import { ConfigProvider } from 'components/common';

NProgress.configure({ parent: 'body', showSpinner: false });

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const { SSR_ENABLED } = getConfig();

const EpicApp = ({ Component, pageProps }) => {
  const { user, loading } = useGetUser();

  return (
    <UserProvider value={{ user, loading }}>
      <ConfigProvider theme={defaultTheme}>
        <Component {...pageProps} />
        <GlobalStyle />
      </ConfigProvider>
    </UserProvider>
  );
};

export default withApollo(EpicApp, { ssr: SSR_ENABLED });

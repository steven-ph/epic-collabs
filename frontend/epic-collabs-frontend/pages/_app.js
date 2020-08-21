import 'styles/index.less';
import { Layout } from 'layouts';
import { getConfig } from 'config';
import { withApollo } from 'components/hoc/with-apollo';
import { useGetUser, UserProvider } from 'context/user';
import { defaultTheme, GlobalStyle } from 'styles';
import { ConfigProvider } from 'components/common';

const { SSR_ENABLED } = getConfig();

const EpicApp = ({ Component, pageProps }) => {
  const { user, loading } = useGetUser();

  return (
    <UserProvider value={{ user, loading }}>
      <ConfigProvider theme={defaultTheme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <GlobalStyle />
      </ConfigProvider>
    </UserProvider>
  );
};

export default withApollo(EpicApp, { ssr: SSR_ENABLED });

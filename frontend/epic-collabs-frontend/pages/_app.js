import 'styles/styles.less';
import { Layout } from 'layouts';
import { getConfig } from 'config';
import { withApollo } from 'components/hoc/with-apollo';
import { useGetUser, UserProvider } from 'context/user';

const { SSR_ENABLED } = getConfig();

const EpicApp = ({ Component, pageProps }) => {
  const { user, loading } = useGetUser();

  return (
    <UserProvider value={{ user, loading }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
};

export default withApollo(EpicApp, { ssr: SSR_ENABLED });

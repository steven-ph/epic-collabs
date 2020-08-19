import 'styles/styles.less';
import { useGetUser, UserProvider } from 'context/user';
import { Layout } from 'layouts';

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

export default EpicApp;

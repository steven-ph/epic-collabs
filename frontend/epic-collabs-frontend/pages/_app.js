import { useGetUser, UserProvider } from 'context/user';

const EpicApp = ({ Component, pageProps }) => {
  const { user } = useGetUser();

  return (
    <UserProvider value={{ user }}>
      <Component {...pageProps} />
    </UserProvider>
  );
};

export default EpicApp;

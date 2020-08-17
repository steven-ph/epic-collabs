// import { Auth0Provider } from 'context/auth';

const EpicApp = ({ Component, pageProps }) => {
  return (
    // <Auth0Provider>
    <Component {...pageProps} />
    // </Auth0Provider>
  );
};

export default EpicApp;

import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext } from 'react';
import { getAuth0Client } from 'libs/auth0';

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

export const Auth0Context = React.createContext();

export const useAuth = () => useContext(Auth0Context);

export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [user, setUser] = useState();
  const [auth0Client, setAuth0] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth0 = async () => {
      const client = await getAuth0Client();
      setAuth0(client);

      if (window.location.search.includes('code=')) {
        const { appState } = await client.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      const authenticated = await client.isAuthenticated();

      setIsAuthenticated(authenticated);

      if (authenticated) {
        const foundUser = await client.getUser();
        setUser(foundUser);
      }

      setLoading(false);
    };

    initAuth0();
  }, []);

  const handleRedirectCallback = async () => {
    setLoading(true);

    await auth0Client.handleRedirectCallback();
    const foundUser = await auth0Client.getUser();

    setLoading(false);
    setIsAuthenticated(true);
    setUser(foundUser);
  };

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        handleRedirectCallback,
        getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
        loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
        getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
        getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
        logout: (...p) => auth0Client.logout(...p)
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};

Auth0Provider.propTypes = {
  children: PropTypes.object,
  onRedirectCallback: PropTypes.function
};

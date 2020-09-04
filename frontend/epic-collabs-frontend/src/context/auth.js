import { isNil } from 'lodash';
import { createContext, useContext, useEffect, useState } from 'react';
import { fetcher } from 'functions/fetcher';

// Use a global to save the user, so we don't have to fetch it again after page navigations
let authState;

const AuthContext = createContext({ user: null, loading: false });

const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ value, children }) => {
  const { user } = value;

  // If the user was fetched in SSR, add it to authState so we don't fetch it again
  useEffect(() => {
    if (!authState && user) {
      authState = user;
    }
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const getAuthUser = async () => {
  if (!isNil(authState)) {
    return authState;
  }

  try {
    authState = await fetcher('/api/me');
  } catch (error) {
    authState = null;
  }

  return authState;
};

const useGetAuthUser = () => {
  const [user, setUser] = useState({
    user: authState || null,
    loading: isNil(authState)
  });

  useEffect(() => {
    if (!isNil(authState)) {
      return;
    }

    let isMounted = true;

    getAuthUser().then(user => {
      if (isMounted) {
        setUser({ user, loading: false });
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return user;
};

export { AuthProvider, useAuthContext, useGetAuthUser, getAuthUser };

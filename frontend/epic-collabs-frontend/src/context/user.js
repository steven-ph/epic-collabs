import { isNil } from 'lodash';
import fetch from 'cross-fetch';
import { createContext, useContext, useEffect } from 'react';

// Use a global to save the user, so we don't have to fetch it again after page navigations
let userState;

const UserContext = createContext({ user: null, loading: false });

const useUserContext = () => useContext(UserContext);

const UserProvider = ({ value, children }) => {
  const { user } = value;

  // If the user was fetched in SSR, add it to userState so we don't fetch it again
  useEffect(() => {
    if (!userState && user) {
      userState = user;
    }
  }, [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const getUser = async () => {
  if (!isNil(userState)) {
    return userState;
  }

  try {
    const res = await fetch('/api/me');

    if (res.ok) {
      userState = await res.json();
    }
  } catch (error) {
    userState = null;
  }

  return userState;
};

const useGetUser = () => {
  const [user, setUser] = React.useState({
    user: userState || null,
    loading: userState === undefined
  });

  React.useEffect(() => {
    if (userState !== undefined) {
      return;
    }

    let isMounted = true;

    getUser().then(user => {
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

export { UserProvider, useUserContext, useGetUser, getUser };

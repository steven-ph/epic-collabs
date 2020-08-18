import React from 'react';
import axios from 'axios';
import { get } from 'lodash';

// Use a global to save the user, so we don't have to fetch it again after page navigations
let userState;

const UserContext = React.createContext({ user: null, loading: false });

const useUserContext = () => React.useContext(UserContext);

const UserProvider = ({ value, children }) => {
  const { user } = value;

  // If the user was fetched in SSR, add it to userState so we don't fetch it again
  React.useEffect(() => {
    if (!userState && user) {
      userState = user;
    }
  }, [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const getUser = () => {
  if (userState !== undefined) {
    console.log({ userState });
    return userState;
  }

  return (
    axios
      .get('/api/me')
      .then(res => {
        userState = get(res, 'data') || null;
        return userState;
      })
      // eslint-disable-next-line
      .catch(err => {
        userState = null;
        return userState;
      })
  );
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

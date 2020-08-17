import React from 'react';
import { useAuth } from 'context/auth';

const Navigation = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth();
  console.log({ isAuthenticated, user });
  return (
    <div>
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect({})}>Log in</button>
      )}

      {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
    </div>
  );
};

export { Navigation };

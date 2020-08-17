import React from 'react';
// import { useAuth } from 'context/auth';

const Navigation = () => {
  // const { isAuthenticated, loginWithRedirect, logout, user } = useAuth();
  return (
    <div>
      Navigation
      {/* {!isAuthenticated && (
        <button onClick={() => loginWithRedirect({})}>Log in</button>
      )}

      {isAuthenticated && <button onClick={() => logout()}>Log out</button>} */}
    </div>
  );
};

export { Navigation };

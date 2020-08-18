import React from 'react';
import { isEmpty } from 'lodash';
import { useUserContext } from 'context/user';

const Navigation = () => {
  const { user } = useUserContext();

  return (
    <div>
      {isEmpty(user) ? (
        <a href="/api/login">Login</a>
      ) : (
        <>
          <span>Hello {user.name}!</span>
          <a href="/api/logout">Logout</a>
        </>
      )}
    </div>
  );
};

export { Navigation };

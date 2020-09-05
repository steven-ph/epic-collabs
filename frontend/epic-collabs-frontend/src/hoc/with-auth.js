import React, { Component } from 'react';
import { get, isEmpty } from 'lodash';
import { getAuthUserData } from 'context/auth';
import { getAuth0Client } from 'libs/auth0';
import { createLoginUrl } from 'functions/create-login-url';
import { RedirectToLogin } from 'components/login-redirect';

const withAuth = InnerComponent => {
  const auth0 = getAuth0Client();

  return class Authenticated extends Component {
    static async getInitialProps(ctx) {
      if (!ctx.req) {
        const user = await getAuthUserData();

        return { user };
      }

      const session = await auth0.getSession(ctx.req);
      if (!session || !session.user) {
        ctx.res.writeHead(302, {
          Location: createLoginUrl({ redirectTo: ctx.req.url })
        });
        ctx.res.end();
        return;
      }

      return { user: get(session, 'user') };
    }

    constructor(props) {
      super(props);
    }

    render() {
      if (isEmpty(this.props.user)) {
        return <RedirectToLogin />;
      }

      return <InnerComponent {...this.props} user={this.props.user} />;
    }
  };
};

export { withAuth };

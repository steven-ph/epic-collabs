import React, { Component } from 'react';
import { get, isEmpty } from 'lodash';
import { getUser } from 'context/user';
import { getAuth0Client } from 'libs/auth0';
import { createLoginUrl } from 'functions/create-login-url';
import { RedirectToLogin } from 'components/login-redirect';

const withAuth = (InnerComponent, { isProtected = false } = {}) => {
  const auth0 = getAuth0Client();

  return class Authenticated extends Component {
    static async getInitialProps(ctx) {
      if (!ctx.req) {
        const user = await getUser();
        return { user };
      }

      const session = await auth0.getSession(ctx.req);
      if ((!session || !session.user) && isProtected) {
        ctx.res.writeHead(302, {
          Location: createLoginUrl(ctx.req.url)
        });
        ctx.res.end();
        return;
      }

      const user = Object.assign({}, isEmpty(session) ? {} : { ...get(session, 'user', {}) });

      return { user: isEmpty(user) ? null : user };
    }

    constructor(props) {
      super(props);
    }

    render() {
      const hasUser = !isEmpty(this.props.user);

      if (isProtected && !hasUser) {
        return <RedirectToLogin />;
      }

      return <div>{<InnerComponent {...this.props} user={this.props.user} />}</div>;
    }
  };
};

export { withAuth };

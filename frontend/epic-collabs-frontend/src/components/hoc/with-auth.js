import React, { Component } from 'react';
import { getUser } from 'context/user';
import { getAuth0Client } from 'libs/auth0';
import { createLoginUrl } from 'functions/create-login-url';
import { RedirectToLogin } from 'components/login-redirect';

const withAuth = InnerComponent => {
  return class Authenticated extends Component {
    static async getInitialProps({ ctx }) {
      if (!ctx.req) {
        const user = await getUser();
        return {
          user
        };
      }

      const session = await getAuth0Client().getSession(ctx.req);
      if (!session || !session.user) {
        ctx.res.writeHead(302, {
          Location: createLoginUrl(ctx.req.url)
        });
        ctx.res.end();
        return;
      }

      return { user: session.user };
    }

    constructor(props) {
      super(props);
    }

    render() {
      if (!this.props.user) {
        return <RedirectToLogin />;
      }

      return (
        <div>{<InnerComponent {...this.props} user={this.props.user} />}</div>
      );
    }
  };
};

export { withAuth };

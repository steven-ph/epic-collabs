import Router from 'next/router';
import React, { Component } from 'react';
import { createLoginUrl } from 'functions/create-login-url';

class RedirectToLogin extends Component {
  componentDidMount() {
    window.location.assign(createLoginUrl({ redirectTo: Router.pathname }));
  }

  render() {
    return <div>Signing you in...</div>;
  }
}

export { RedirectToLogin };

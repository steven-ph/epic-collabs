import Router from 'next/router';
import React, { Component } from 'react';
import { CommonLayout } from 'layouts/CommonLayout';
import { createLoginUrl } from 'functions/create-login-url';

class RedirectToLogin extends Component {
  componentDidMount() {
    window.location.assign(createLoginUrl(Router.pathname));
  }

  render() {
    return (
      <CommonLayout>
        <div>Signing you in...</div>
      </CommonLayout>
    );
  }
}

export { RedirectToLogin };

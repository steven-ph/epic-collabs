import Router from 'next/router';
import React, { Component } from 'react';
import { CommonLayout } from 'layouts';
import { Loading } from 'components/common';
import { createLoginUrl } from 'functions/create-login-url';

class RedirectToLogin extends Component {
  componentDidMount() {
    window.location.assign(createLoginUrl({ redirectTo: Router.pathname }));
  }

  render() {
    return (
      <CommonLayout>
        <Loading />
      </CommonLayout>
    );
  }
}

export { RedirectToLogin };

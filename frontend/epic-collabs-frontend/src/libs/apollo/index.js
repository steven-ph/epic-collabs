import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { get } from 'lodash';
import { ApolloProvider } from '@apollo/client';
import { createApolloClient, getToken } from './create-apollo-client';

const isServer = typeof window === 'undefined';

const getDisplayName = PageComponent => {
  const displayName =
    PageComponent.displayName || PageComponent.name || 'Component';

  if (displayName === 'App') {
    console.warn('This withApollo HOC only works with PageComponents.');
  }

  return `withApollo(${displayName})`;
};

const withApollo = (PageComponent, { ssr = true } = {}) => {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const client =
      apolloClient ||
      createApolloClient({ initialState: apolloState, headers: {} });

    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  if (process.env.NODE_ENV !== 'production') {
    WithApollo.displayName = getDisplayName(PageComponent);
  }

  const getInitialProps = async ctx => {
    const headers = get(ctx, 'req.headers');
    const inAppContext = Boolean(ctx.ctx);
    const token = getToken(headers);

    const apolloClient = createApolloClient({
      initialState: {},
      headers
    });

    ctx.apolloClient = apolloClient;

    let pageProps = {};
    if (PageComponent.getInitialProps) {
      pageProps = await PageComponent.getInitialProps(ctx);
    } else if (inAppContext) {
      pageProps = await App.getInitialProps(ctx);
    }
    if (isServer) {
      const { AppTree } = ctx;

      if (ctx.res && ctx.res.finished) {
        return pageProps;
      }

      if (ssr && AppTree) {
        try {
          const { getDataFromTree } = await import('@apollo/client/react/ssr');

          let props;

          if (inAppContext) {
            props = { ...pageProps, apolloClient };
          } else {
            props = { pageProps: { ...pageProps, apolloClient } };
          }

          await getDataFromTree(<AppTree {...props} />);
        } catch (error) {
          console.error('Error while running `getDataFromTree`', error);
        }
      }

      Head.rewind();
    }

    return {
      ...pageProps,
      token,
      apolloState: apolloClient.cache.extract(),
      apolloClient: ctx.apolloClient
    };
  };

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = getInitialProps;
  }

  return WithApollo;
};

export { withApollo };

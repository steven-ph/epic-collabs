import React from 'react';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';

const isServer = typeof window === 'undefined';

let cachedClient;

const getDisplayName = PageComponent => {
  const displayName = PageComponent.displayName || PageComponent.name || 'Component';

  if (displayName === 'App') {
    console.warn('This withApollo HOC only works with PageComponents.');
  }

  return `withApollo(${displayName})`;
};

const withApollo = createApolloClientFn => (PageComponent, { ssr = true } = {}) => {
  const initApolloClient = (...args) => {
    if (isServer) {
      return createApolloClientFn(...args);
    }

    if (!cachedClient) {
      cachedClient = createApolloClientFn(...args);
    }

    return cachedClient;
  };

  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = apolloClient || initApolloClient({ initialState: apolloState, headers: {} });

    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  if (process.env.NODE_ENV !== 'production') {
    WithApollo.displayName = getDisplayName(PageComponent);
  }

  const getInitialProps = async ({ ctx }) => {
    const { AppTree } = ctx;

    const apolloClient = initApolloClient({
      initialState: {},
      headers: ctx.req.headers
    });

    ctx.apolloClient = apolloClient;

    const pageProps = PageComponent.getInitialProps ? await PageComponent.getInitialProps(ctx) : {};

    if (isServer) {
      if (ctx.res && ctx.res.finished) {
        return {};
      }

      if (ssr) {
        try {
          const { getDataFromTree } = await import('@apollo/client/react/ssr');

          await getDataFromTree(
            <AppTree
              pageProps={{
                ...pageProps,
                apolloClient
              }}
            />
          );
        } catch (error) {
          console.error('Error while running `getDataFromTree`', error);
        }
      }

      Head.rewind();
    }

    const apolloState = apolloClient.cache.extract();

    return {
      ...pageProps,
      apolloState
    };
  };

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = getInitialProps;
  }

  return WithApollo;
};

export { withApollo };

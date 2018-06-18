import App from './App';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { hydrate } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-boost';

const link = new HttpLink({ uri: 'http://localhost:4000/graphql' });

export const clientClient = new ApolloClient({
  link,
  cache: new InMemoryCache().restore((window as any).__APOLLO_STATE__),
  ssrForceFetchDelay: 100,
});

hydrate(
  <ApolloProvider client={clientClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}

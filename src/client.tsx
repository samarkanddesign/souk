import App from './App';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { hydrate } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { Provider as ReduxProvider } from 'react-redux';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-boost';
import { createStore } from 'redux';
import { hydrate as hydrateStyles } from 'emotion';
import { composeWithDevTools } from 'redux-devtools-extension';
import throttle from 'lodash/throttle';

import reducer, { State, Action } from './store/reducers';

const link = new HttpLink({ uri: 'http://localhost:4000/graphql' });

export const clientClient = new ApolloClient({
  link,
  cache: new InMemoryCache().restore((window as any).__APOLLO_STATE__),
  ssrForceFetchDelay: 100,
});

const store = createStore<State, Action, {}, {}>(
  reducer,
  (window as any).__SAVED_STATE__ as State,
  composeWithDevTools(),
);

hydrate(
  <ApolloProvider client={clientClient}>
    <ReduxProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReduxProvider>
  </ApolloProvider>,
  document.getElementById('root'),
);

hydrateStyles((window as any).__EMOTION_IDS__);

import('js-cookie').then(cookies => {
  store.subscribe(
    throttle(() => {
      const basketId = store.getState().basket.basketId;
      if (basketId) {
        cookies.set('basketId', basketId, { expires: 1 });
      }
    }, 1000),
  );
});

if (module.hot) {
  module.hot.accept();
}

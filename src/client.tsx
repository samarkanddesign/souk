import App from './App';
import { Router } from 'react-router-dom';
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
import { setContext } from 'apollo-link-context';
import throttle from 'lodash/throttle';
import { createBrowserHistory } from 'history';

import reducer, { State, Action } from './store/reducers';
import { SetBasketVisibility } from './store/reducers/basket';
import { getTokenExpiry } from './utils/tokenExpiry';

const store = createStore<State, Action, {}, {}>(
  reducer,
  (window as any).__SAVED_STATE__ as State,
  composeWithDevTools(),
);

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });
const authLink = setContext((_, { headers }) => {
  // get the authentication token from redux state if it exists
  const token = store.getState().auth.token;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const clientClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache().restore((window as any).__APOLLO_STATE__),
  ssrForceFetchDelay: 100,
});

const history = createBrowserHistory();

hydrate(
  <ApolloProvider client={clientClient}>
    <ReduxProvider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </ReduxProvider>
  </ApolloProvider>,
  document.getElementById('root'),
);

hydrateStyles((window as any).__EMOTION_IDS__);

import('js-cookie').then(cookies => {
  store.subscribe(
    throttle(() => {
      const state = store.getState();
      const basketId = state.basket.basketId;
      const token = state.auth.token;
      if (basketId) {
        cookies.set('basketId', basketId, { expires: 1 });
      } else {
        cookies.remove('basketId');
      }

      if (token) {
        getTokenExpiry(token).forEach(expires =>
          cookies.set('token', token, { expires }),
        );
      } else {
        cookies.remove('token');
      }
    }, 1000),
  );
});

history.listen(() => {
  if (store.getState().basket.showing) {
    store.dispatch(SetBasketVisibility(false));
  }
});

if (module.hot) {
  module.hot.accept();
}

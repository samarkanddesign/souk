import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import throttle from 'lodash/throttle';

import reducer, { State, Action } from './reducers';
const isServer = typeof window !== 'undefined';

const store = createStore<State, Action, {}, {}>(
  reducer,
  (window as any).__SAVED_STATE__ as State,
  composeWithDevTools(),
);

export default store;

if (!isServer) {
}

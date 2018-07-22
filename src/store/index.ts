import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// import throttle = require('lodash/throttle');

import reducer, { State, Action } from './reducers';

const store = createStore<State, Action, {}, {}>(
  reducer,
  {} as State,
  composeWithDevTools(),
);

export default store;

// store.subscribe(() => {});

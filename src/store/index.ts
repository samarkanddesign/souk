import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer, { State } from './reducers';

const store = createStore<State, AnyAction, {}, {}>(
  reducer,
  {} as State,
  composeWithDevTools(),
);

export default store;

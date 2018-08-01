import { combineReducers } from 'redux';
import { basketReducer, BasketAction, BasketState } from './basket';
import { authReducer, AuthState, AuthAction } from './auth';

export type Action = BasketAction | AuthAction;
export interface State {
  basket: BasketState;
  auth: AuthState;
}

const reducer = combineReducers({
  basket: basketReducer,
  auth: authReducer,
});

export default reducer;

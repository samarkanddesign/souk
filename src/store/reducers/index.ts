import { combineReducers } from 'redux';
import cart, { CartState, CartAction } from './cartReducer';

export type StoreAction = CartAction;
export interface State {
  cart: CartState;
}

const reducer = combineReducers<State, StoreAction>({
  cart,
});

export default reducer;

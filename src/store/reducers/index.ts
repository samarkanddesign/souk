import { combineReducers } from 'redux';
import { basketReducer, BasketAction, BasketState } from './basket';

export type Action = BasketAction;
export interface State {
  basket: BasketState;
}

const reducer = combineReducers<State, Action>({ basket: basketReducer });

export default reducer;

import {
  adjust,
  lensProp,
  over,
  inc,
  gte,
  reject,
  equals,
  prop,
  compose,
} from 'ramda';

interface AddProductToCart {
  type: 'AddProductToCart';
  id: string;
}

export const AddProductToCart = (id: string): AddProductToCart => ({
  type: 'AddProductToCart',
  id,
});

interface RemoveProductFromCart {
  type: 'RemoveProductFromCart';
  id: string;
}

export const RemoveProductFromCart = (id: string): RemoveProductFromCart => ({
  type: 'RemoveProductFromCart',
  id,
});

interface CartItem {
  id: string;
  quantity: number;
}

export type CartAction = AddProductToCart | RemoveProductFromCart;
export interface CartState {
  items: ReadonlyArray<CartItem>;
}

const increaseQty = over(lensProp('quantity'), inc);

const cart = (
  state: CartState = { items: [] },
  action: CartAction,
): CartState => {
  switch (action.type) {
    case 'AddProductToCart': {
      const pos = state.items.findIndex(i => i.id === action.id);
      return gte(pos, 0)
        ? { items: adjust(increaseQty, pos, state.items) }
        : { items: state.items.concat({ id: action.id, quantity: 1 }) };
    }

    case 'RemoveProductFromCart': {
      return {
        items: reject(
          compose(
            equals(action.id),
            prop<'id', string>('id'),
          ),
          state.items,
        ),
      };
    }

    default: {
      return state;
    }
  }
};

export default cart;

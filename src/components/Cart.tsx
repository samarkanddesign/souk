import * as React from 'react';
import { connect } from 'react-redux';
import { State, StoreAction } from '../store/reducers';
import { Dispatch } from 'redux';
import { RemoveProductFromCart } from '../store/reducers/cartReducer';

interface Props {
  cart: State['cart'];
  removeItem: (id: string) => void;
}

export const Cart = ({ cart, removeItem }: Props) => {
  return (
    <div>
      <ul>
        {cart.items.map(item => (
          <li key={item.id}>
            {item.id} x {item.quantity}{' '}
            <button onClick={() => removeItem(item.id)}>🗑</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const stateMappedToProps = (state: State) => {
  return { cart: state.cart };
};

const mapDispatchToProps = (dispatch: Dispatch<StoreAction>) => {
  return {
    removeItem: (id: string) => dispatch(RemoveProductFromCart(id)),
  };
};

export default connect(
  stateMappedToProps,
  mapDispatchToProps,
)(Cart);

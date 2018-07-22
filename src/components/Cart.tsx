import * as React from 'react';

import { GetBasket, BasketQuery } from '../graphql/queries';
import { RemoveItemMutation, RemoveProduct } from '../graphql/mutations';
import { connect } from 'react-redux';
import { State } from '../store/reducers';
import BasketInitializer from './BasketInitializer';

interface StateMappedToProps {
  basketId?: string;
}

type Props = StateMappedToProps;

export const Cart = ({ basketId }: Props) => {
  if (!basketId) {
    return <BasketInitializer />;
  }
  return (
    <div>
      <BasketQuery query={GetBasket} variables={{ basketId }}>
        {({ data, loading }) => {
          if (loading) {
            return 'loading...';
          }
          if (!data || !data.basket || data.basket.items.length === 0) {
            return <span>Basket empty</span>;
          }

          return (
            <ul>
              {data.basket.items.map(item => (
                <RemoveItemMutation
                  key={item.id}
                  mutation={RemoveProduct}
                  variables={{
                    basketId: basketId,
                    itemId: parseInt(item.id, 10),
                  }}
                >
                  {removeItem => (
                    <li>
                      {item.product.name} x {item.quantity}{' '}
                      <button onClick={() => removeItem()}>🗑</button>
                    </li>
                  )}
                </RemoveItemMutation>
              ))}
            </ul>
          );
        }}
      </BasketQuery>
    </div>
  );
};

const MapStateToProps = (state: State): StateMappedToProps => ({
  basketId: state.basket.basketId,
});

export default connect(MapStateToProps)(Cart);

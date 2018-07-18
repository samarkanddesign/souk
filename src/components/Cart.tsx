import * as React from 'react';

import { basketId } from '../store/basketId';
import { GetBasket, BasketQuery } from '../graphql/queries';
import { RemoveItemMutation, RemoveProduct } from '../graphql/mutations';

export const Cart = () => {
  return (
    <div>
      <BasketQuery query={GetBasket} variables={{ basketId: basketId }}>
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

export default Cart;

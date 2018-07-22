import * as React from 'react';

import { GetBasket, BasketQuery } from '../graphql/queries';
import { RemoveItemMutation, RemoveProduct } from '../graphql/mutations';
import { connect } from 'react-redux';
import { State } from '../store/reducers';
import BasketInitializer from './BasketInitializer';
import { ResetList } from './Styled';
import { TextButton } from './Button';

interface StateMappedToProps {
  basketId?: string;
}

type Props = StateMappedToProps;

export const Basket = ({ basketId }: Props) => {
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
            <ResetList>
              {data.basket.items.map(item => (
                <RemoveItemMutation
                  key={item.id}
                  mutation={RemoveProduct}
                  variables={{
                    basketId: basketId,
                    itemId: parseInt(item.id, 10),
                  }}
                >
                  {(removeItem: () => void) => (
                    <li>
                      {item.product.name} x {item.quantity}{' '}
                      <TextButton onClick={removeItem}>🗑</TextButton>
                    </li>
                  )}
                </RemoveItemMutation>
              ))}
            </ResetList>
          );
        }}
      </BasketQuery>
    </div>
  );
};

const MapStateToProps = (state: State): StateMappedToProps => ({
  basketId: state.basket.basketId,
});

export default connect(MapStateToProps)(Basket);

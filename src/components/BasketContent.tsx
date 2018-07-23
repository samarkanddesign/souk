import * as React from 'react';
import styled from 'react-emotion';

import { BasketItem } from '../../types/gql';
import { ResetList } from './Styled';
import { RemoveItemMutation, RemoveProduct } from '../graphql/mutations';

import { ProductThumb } from './ProductThumb';
import Price from './Price';
import { Link } from '../../node_modules/@types/react-router-dom';
import { ProductLink } from './ProductLink';

const StyledListItem = styled('li')({
  display: 'grid',
  gridTemplateColumns: '4rem auto',
  gridColumnGap: '1rem',
  marginBottom: '1rem',
});

const ItemLabel = styled('h3')({
  fontSize: '1rem',
  textTransform: 'uppercase',
  margin: 0,
});

const BasketListItem = ({ item }: { item: BasketItem }) => {
  return (
    <StyledListItem>
      <div>
        <ProductThumb thumbnail={item.product.thumbnail} />
      </div>
      <div>
        <ProductLink slug={item.product.slug}>
          <ItemLabel>{item.product.name}</ItemLabel>
        </ProductLink>
        <p>
          {item.quantity} x{' '}
          <Price
            price={item.product.price}
            salePrice={item.product.salePrice}
          />
        </p>
      </div>
    </StyledListItem>
  );
};

const BasketList = styled(ResetList)({
  flex: 1,
  overflow: 'scroll',
});

interface BasketContentProps {
  loading: boolean;
  items?: BasketItem[];
  basketId: string;
}

export const BasketContent = ({
  loading,
  items = [],
  basketId,
}: BasketContentProps) => {
  if (loading) {
    return <span>loading...</span>;
  }
  if (items.length === 0) {
    return <span>Basket empty</span>;
  }

  return (
    <BasketList>
      {items.map(item => (
        <RemoveItemMutation
          key={item.id}
          mutation={RemoveProduct}
          variables={{
            basketId: basketId,
            itemId: parseInt(item.id, 10),
          }}
        >
          {(removeItem: () => void) => <BasketListItem item={item} />}
        </RemoveItemMutation>
      ))}
    </BasketList>
  );
};

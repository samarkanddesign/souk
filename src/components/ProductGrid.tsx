import * as React from 'react';
import styled from 'react-emotion';

import { ProductTile } from './ProductTile';
import { Product } from '../../types/gql';
import { ResetList } from './Styled';

const ProductGridContainer = styled(ResetList)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  grid-auto-rows: 1fr;
  &::before {
    content: '';
    width: 0;
    padding-bottom: 100%;
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }
  & > *:first-child {
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }
`;

interface Props {
  products: Product[];
}

export function ProductGrid({ products }: Props) {
  return (
    <ProductGridContainer>
      {products.map(product => (
        <ProductTile product={product} key={product.id} />
      ))}
    </ProductGridContainer>
  );
}

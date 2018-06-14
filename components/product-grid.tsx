import * as React from 'react';
import { Product } from 'types/gql';
import styled from 'react-emotion';
import { ProductTile } from './product-tile';

const ProductGridContainer = styled('ul')`
  margin: 0;
  padding: 0;
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
  children: Product[];
}

export default function ProductGrid({ children }: Props) {
  return (
    <ProductGridContainer>
      {children.map(product => (
        <ProductTile product={product} key={product.id} />
      ))}
    </ProductGridContainer>
  );
}

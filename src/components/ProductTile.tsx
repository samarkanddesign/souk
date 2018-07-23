import * as React from 'react';
import styled from 'react-emotion';

import { typeSize } from './style';
import { Product } from '../../types/gql';
import { ProductThumb } from './ProductThumb';
import { ProductLink } from './ProductLink';

const ProductHeading = styled('h2')`
  color: #555;
  font-size: ${typeSize.fox};
`;

const Tile = styled('li')`
  list-style-type: none;
  text-align: center;
`;

interface Props {
  product: Product;
}

export function ProductTile({ product }: Props) {
  return (
    <Tile>
      <ProductLink slug={product.slug}>
        <ProductThumb thumbnail={product.thumbnail} />
        <ProductHeading>{product.name}</ProductHeading>
        £{(product.price / 100).toFixed(2)}
      </ProductLink>
    </Tile>
  );
}

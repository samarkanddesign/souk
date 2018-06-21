import * as React from 'react';
import { Product } from '../../types/gql';
import { Option } from 'catling';
import Price from './Price';

interface Props {
  product: Product;
}

export default function({ product }: Props) {
  return (
    <>
      <h1>{product.name}</h1>
      <Price price={product.price} salePrice={product.salePrice} />
      {Option(product.stockQty)
        .map(
          stock =>
            stock > 0 ? <p>In Stock ({stock} left)</p> : <p>Out of stock</p>,
        )
        .get()}
      <div>{product.description}</div>
    </>
  );
}

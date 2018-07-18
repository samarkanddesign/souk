import * as React from 'react';
import { Product } from '../../types/gql';
import { Option } from 'catling';
import Price from './Price';

interface Props {
  product: Product;
  addToCart: () => void;
}

export const ProductDetail = ({ product, addToCart }: Props) => {
  return (
    <>
      <h1>{product.name}</h1>
      {product.images.map(i => (
        <div key={i.id}>
          <img
            style={{ maxWidth: '100%', height: 'auto' }}
            src={i.url}
            alt=""
          />
        </div>
      ))}
      <Price price={product.price} salePrice={product.salePrice} />
      {Option(product.stockQty)
        .map(
          stock =>
            stock > 0 ? <p>In Stock ({stock} left)</p> : <p>Out of stock</p>,
        )
        .get()}
      <div>{product.description}</div>

      <button onClick={addToCart}>Add To Cart</button>
    </>
  );
};

export default ProductDetail;

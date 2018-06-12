import { Product } from 'types/gql';

interface Props {
  product: Product;
}

export function ProductTile({ product }: Props) {
  return (
    <li>
      <h2>{product.name}</h2>
      £{(product.price / 100).toFixed(2)}
    </li>
  );
}

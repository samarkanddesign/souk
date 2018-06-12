import styled from 'react-emotion';
import { Product } from 'types/gql';
import { spacing, typeSize } from './style';

const ProductHeading = styled('h2')`
  color: #555;
  font-size: ${typeSize.fox};
`;

const Tile = styled('li')`
  list-style-type: none;
  background: #ddd;
  padding: ${spacing.goat};
`;

interface Props {
  product: Product;
}

export function ProductTile({ product }: Props) {
  return (
    <Tile>
      <ProductHeading>{product.name}</ProductHeading>
      £{(product.price / 100).toFixed(2)}
    </Tile>
  );
}

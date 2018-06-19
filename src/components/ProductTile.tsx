import * as React from 'react';
import styled from 'react-emotion';

// import { Product } from 'types/gql';
import { spacing, typeSize } from './style';
import { Link } from 'react-router-dom';

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
  product: any;
}

function ProductLink({
  children,
  slug,
}: {
  children: React.ReactNode;
  slug: string;
}) {
  return <Link to={`/product/${slug}`}>{children}</Link>;
}

export function ProductTile({ product }: Props) {
  return (
    <Tile>
      <ProductLink slug={product.slug}>
        <ProductHeading>{product.name}</ProductHeading>
      </ProductLink>
      £{(product.price / 100).toFixed(2)}
    </Tile>
  );
}

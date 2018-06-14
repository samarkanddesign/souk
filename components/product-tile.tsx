import styled from 'react-emotion';
import Link from 'next/link';

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

function ProductLink({
  children,
  slug,
}: {
  children: React.ReactNode;
  slug: string;
}) {
  return (
    <Link href={`/product?slug=${slug}`}>
      <a>{children}</a>
    </Link>
  );
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

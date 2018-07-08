import * as React from 'react';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';
import { Option } from 'catling';

import { spacing, typeSize } from './style';
import { Product } from '../../types/gql';

const ProductHeading = styled('h2')`
  color: #555;
  font-size: ${typeSize.fox};
`;

const Tile = styled('li')`
  list-style-type: none;
  text-align: center;
`;

const ProductImage = styled('img')`
  width: 100%;
  height: auto;
`;

interface Props {
  product: Product;
}

const StyledLink = styled(Link)`
  display: block;
  text-decoration: none;
`;

function ProductLink({
  children,
  slug,
}: {
  children: React.ReactNode;
  slug: string;
}) {
  return <StyledLink to={`/product/${slug}`}>{children}</StyledLink>;
}

export function ProductTile({ product }: Props) {
  return (
    <Tile>
      <ProductLink slug={product.slug}>
        <ProductImage
          src={Option(product.thumbnail)
            .map(t => t.url)
            .getOrElse('https://via.placeholder.com/150x150')}
          alt=""
        />
        <ProductHeading>{product.name}</ProductHeading>
        £{(product.price / 100).toFixed(2)}
      </ProductLink>
    </Tile>
  );
}
